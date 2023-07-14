import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import TokenArtifact from "../../contracts/TouristConTract.json"
import contractAddress from "../../contracts/contract-address.json";


function GetTouristInfor() {
  const [infor, setInfor] = useState(null);
  const abi = TokenArtifact.abi;
  
  useEffect(() => {
    // Gọi API hoặc các xử lý khác để lấy dữ liệu infor
    fetchData()
      .then((inforData) => {
        console.log(inforData);
        setInfor(inforData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Hàm gọi API hoặc xử lý để lấy dữ liệu infor
  const fetchData = async () => {
    const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');
    const contract = new web3.eth.Contract(abi, contractAddress.Token);
    
    // Thực hiện các bước để lấy dữ liệu infor
    const infor = await contract.methods.getBalance('0xcbffe3fa9226a7cD7CfFC770103299B83518F538').call();
    console.log(typeof infor)
    return infor;
  };

  // Hiển thị dữ liệu infor trên giao diện
  return (
    <div>
    hello
      {infor ? (
        <div>
          <h1>Thông tin du khách:</h1>
          <p>Tên: {infor}</p>
          <p>Tuổi: {infor}</p>
          {/* Hiển thị các thông tin khác */}
        </div>
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
}

export default GetTouristInfor;