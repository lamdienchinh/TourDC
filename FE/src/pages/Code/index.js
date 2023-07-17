import { useState, useEffect } from "react";
import { Connect } from "../../components/dapp/connected";
import "./css/Code.scss";
import TokenArtifact from "../../contracts/TouristConTract.json";
import contractAddress from "../../contracts/contract-address.json";
import Web3 from "web3";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Code = () => {
    const [input, setInput] = useState();
    const [placeId, setPlaceId] = useState();
    const [currentAccount, setCurrentAccount] = useState('');
    
    const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');
    const contract = new web3.eth.Contract(TokenArtifact.abi, contractAddress.Token);

    const handleChange = (content) => {
        setInput(content);
    }
    const submitCode = async () => {
        console.log(input)
        await contract.methods.checkValidTicket(input).call()
        .then((result)=>{
            console.log("result: ", result);
            if(result) {
                checkIn(currentAccount, input, placeId)
                .then(() => {
                    toast.success('Check-in success!, Your trip was saved!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true, 
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                })
                .catch((error) => toast.error("Error: ", error));
            } else {
                toast.error('Ticket not avaiable or used!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });;
            }
        })
        .catch((error) => console.error("error: ", error));
    }
    useEffect(() => {
        const loadWeb3 = async () => {
          if (window.ethereum) {
            // Sử dụng Web3.js để kết nối với MetaMask
            const web3 = new Web3(window.ethereum);
            try {
              // Yêu cầu quyền truy cập tài khoản MetaMask
              await window.ethereum.enable();
              // Lấy danh sách tài khoản MetaMask hiện có
              const accounts = await web3.eth.getAccounts();
              // Lưu địa chỉ tài khoản đầu tiên vào state
              setCurrentAccount(accounts[0]);
            } catch (error) {
              console.error(error);
            }
          }
        };
    
        const handleAccountsChanged = (accounts) => {
          if (accounts.length > 0) {
            // Cập nhật địa chỉ ví khi người dùng chuyển tài khoản trên MetaMask
            setCurrentAccount(accounts[0]);
          } else {
            // Người dùng đã đăng xuất khỏi MetaMask
            setCurrentAccount('');
          }
        };
    
        loadWeb3();
    
        // Đăng ký sự kiện "accountsChanged" để lắng nghe thay đổi tài khoản
        window.ethereum.on('accountsChanged', handleAccountsChanged);
    
        // Xóa bỏ sự kiện khi component bị hủy
        return () => {
          window.ethereum.off('accountsChanged', handleAccountsChanged);
        };
      }, []);

    useEffect(() => {
        // Lấy đường link hiện tại
        const url = new URL(window.location.href);
    
        // Lấy các tham số từ đường link
        const searchParams = new URLSearchParams(url.search);
    
        // Lấy giá trị của tham số "id"
        const id = searchParams.get('id');
        console.log(id); // In ra id
    
        // Tiếp tục xử lý với giá trị id
        // ...
        setPlaceId(id)
      }, []);
    
    async function checkIn(currentAccount, ticketID, placeId) {
        await window.ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [
              {
                from: currentAccount,
                to: contractAddress.Token,
                gasLimit: '0x5028', // Customizable by the user during MetaMask confirmation.
                maxPriorityFeePerGas: '0x3b9aca00', // Customizable by the user during MetaMask confirmation.
                maxFeePerGas: '0x2540be400', // Customizable by the user during MetaMask confirmation.
                data: contract.methods.checkIn(ticketID, placeId).encodeABI()
              },
            ],
          })
          .then((txHash) => console.log("txHash: ", txHash))
          .catch((error) => console.error("error: ", error));
    }
    
    return (
        <section className="code-page">
            <Connect />
            <div className="code-wrapper">
                <h1>Nhập mã vé để xác nhận checkin</h1>
                <div className="code-box">
                    <input className="code" placeholder="Nhập mã vé ở đây" onChange={(event) => handleChange(event.target.value)}></input>
                </div>
                <button className="code-btn" onClick={() => submitCode()}>Kiểm tra</button>
            </div>
            
            {/* Same as */}
           
        </section>
        
    );
}

export default Code;