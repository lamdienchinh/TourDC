// import Web3 from 'web3'
// import React, { useState, useEffect } from 'react';

// const connectWallet = async () => {
//   const [currentAccount, setCurrentAccount] = useState('');

//   useEffect(() => {
//     const loadWeb3 = async () => {
//       if (window.ethereum) {
//         // Sử dụng Web3.js để kết nối với MetaMask
//         const web3 = new Web3(window.ethereum);
//         try {
//           // Yêu cầu quyền truy cập tài khoản MetaMask
//           await window.ethereum.enable();
//           // Lấy danh sách tài khoản MetaMask hiện có
//           const accounts = await web3.eth.getAccounts();
//           // Lưu địa chỉ tài khoản đầu tiên vào state
//           setCurrentAccount(accounts[0]);
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     };

//     const handleAccountsChanged = (accounts) => {
//       if (accounts.length > 0) {
//         // Cập nhật địa chỉ ví khi người dùng chuyển tài khoản trên MetaMask
//         setCurrentAccount(accounts[0]);
//       } else {
//         // Người dùng đã đăng xuất khỏi MetaMask
//         setCurrentAccount('');
//       }
//     };

//     loadWeb3();

//     // Đăng ký sự kiện "accountsChanged" để lắng nghe thay đổi tài khoản
//     window.ethereum.on('accountsChanged', handleAccountsChanged);

//     // Xóa bỏ sự kiện khi component bị hủy
//     return () => {
//       window.ethereum.off('accountsChanged', handleAccountsChanged);
//     };
//   }, []);

//   return currentAccount;
// }