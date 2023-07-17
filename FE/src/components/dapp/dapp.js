import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import TokenArtifact from "../../contracts/TouristConTract.json"
import contractAddress from "../../contracts/contract-address.json";


export function ConnectWallet() {
  const [currentAccount, setCurrentAccount] = useState('');

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

  return (
    <div>
      <h1>Địa chỉ ví MetaMask hiện tại: {currentAccount}</h1>
    </div>
  );
}


export function GetTouristInfor() {
  const [infor, setInfor] = useState(null);
  const abi = TokenArtifact.abi;
  // Hàm gọi API hoặc xử lý để lấy dữ liệu infor
  const fetchData = async () => {
    const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');
    const contract = new web3.eth.Contract(abi, contractAddress.Token);

    // Thực hiện các bước để lấy dữ liệu infor
    const infor = await contract.methods.getAllJourney().call({ from: '0x0ea3E6ce65d314a212F3A9E50917A6402A5e20b0' });
    console.log(infor)
    return infor;
  };

  // useEffect(() => {
  //   // Gọi API hoặc các xử lý khác để lấy dữ liệu infor
  //   fetchData()
  //     .then((inforData) => {
  //       console.log(inforData);
  //       setInfor(inforData);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);


  // Hiển thị dữ liệu infor trên giao diện
  return (
    <div>
      hello
      {infor ? (
        <div>
          <h1>Thông tin du khách:</h1>

          <p>hành trình: {infor}</p>
          {/* Hiển thị các thông tin khác */}
        </div>
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
}

