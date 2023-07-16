import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import TokenArtifact from "../../contracts/TouristConTract.json"
import contractAddress from "../../contracts/contract-address.json";




// export function CheckIn(QRcode, review, rate, ticketID) {
  
//   const checkInHandle = async () => {
//     const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');
//     const contract = new web3.eth.Contract(TokenArtifact.abi, contractAddress.Token);
    
//     // Thực hiện các bước để thực hiện giao dịch contract
//     const infor = await contract.methods.getBalance('0xcbffe3fa9226a7cD7CfFC770103299B83518F538').call();
//     console.log(typeof infor)
//     return infor.toString();
//   };

//   return (
//     <div>
      
//     </div>
//   );

// }


export function TicketForm() {
  const [ticketCode, setTicketCode] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');

  const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');
  const contract = new web3.eth.Contract(TokenArtifact.abi, contractAddress.Token);

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


  const handleSubmit = (e) => {
    e.preventDefault();
    // Thực hiện xử lý dữ liệu (ví dụ: gửi đến máy chủ)
    console.log('Mã số vé:', ticketCode);
    console.log('Bình luận:', comment);
    console.log('Đánh giá:', rating);
    console.log('Địa chỉ ví: ', currentAccount);
    
    checkIn(currentAccount, 3, comment, rating, ticketCode)
      .then(()=>{
        const hashedMessage = web3.utils.soliditySha3(currentAccount,100,"check-in", 0);
        console.log("Hashed Message: ",hashedMessage)
        const signatureObj =  web3.eth.accounts.sign(hashedMessage, '0x93856d655b8ecd9ebff0f2c3c5d614834ecf76b66b6fca8ad6fc37381c1989b4')
        console.log("signature: ", signatureObj.signature);
        const signature = signatureObj.signature
       
        const r = signature.slice(0, 66);
        const s = "0x" + signature.slice(66, 130);
        const v = parseInt(signature.slice(130, 132), 16);
        console.log({ r, s, v });

        alert(signature);
        reward(currentAccount, '0xcbffe3fa9226a7cD7CfFC770103299B83518F538',100, "check-in", 0, signature)
      });
    
    // Đặt lại giá trị trong form
    setTicketCode('');
    setComment('');
    setRating('');
  };

  async function checkIn(currentAccount, QRcode, review, rate, ticketID) {
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
            data: contract.methods.checkIn(QRcode, review, rate, ticketID).encodeABI()
          },
        ],
      })
      .then((txHash) => console.log("txHash: ", txHash))
      .catch((error) => console.error("error: ", error));
    
  }

  async function reward(currentAccount,signer, amount, message, nonce, signature){
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
            data: contract.methods._mintMinerReward(signer, currentAccount, amount, message, nonce, signature).encodeABI()
          },
        ],
      })
      .then((txHash) => console.log("txHash: ", txHash))
      .catch((error) => console.error("error: ", error));
    
  }

  async function getSignature(currentAccount) {
    // WEB3 JS SIGNATURE
		const hashedMessage = web3.utils.soliditySha3(currentAccount,100,"check-in", 0);
		console.log("Hashed Message: ",hashedMessage)
		const signatureObj = await web3.eth.accounts.sign(hashedMessage, '93856d655b8ecd9ebff0f2c3c5d614834ecf76b66b6fca8ad6fc37381c1989b4')
		console.log("signature: ", signatureObj.signature);
		// const signature = signatureObj.signature;
  }
  return (
    <div>
      <h2>Form đánh giá vé</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ticketCode">Mã số vé:</label>
          <input
            type="text"
            id="ticketCode"
            value={ticketCode}
            onChange={(e) => setTicketCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">Bình luận:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rating">Đánh giá:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Chọn đánh giá</option>
            <option value="1">1 sao</option>
            <option value="2">2 sao</option>
            <option value="3">3 sao</option>
            <option value="4">4 sao</option>
            <option value="5">5 sao</option>
          </select>
        </div>
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
}
