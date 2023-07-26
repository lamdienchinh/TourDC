import Web3 from 'web3'
import TokenArtifact from "../../contracts/TouristConTract.json"
import contractAddress from "../../contracts/contract-address.json";
import { toast } from "react-toastify"
import BigNumber from "bignumber.js";


const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');
const contract = new web3.eth.Contract(TokenArtifact.abi, contractAddress.Token);

async function reward(currentAccount, signer, amount, message, nonce, signature) {
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
    .then((txHash) => console.log("txHash reward: ", txHash))
    .catch((error) => console.error("error: ", error));

}

async function review(currentAccount, placeID, tripId, comment, rate, title) {
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
        data: contract.methods.review(placeID, tripId, comment, rate, title).encodeABI()
      },
    ],
  })
  toast.success("Lưu cảm nghĩ thành công!")
}

// function lưu data review vào blockchain
const reviewTrip = async (currentAccount, placeID, tripId, comment, rate, title) => {
  try {
    let temp = await review(currentAccount, placeID, tripId, comment, rate, title)
    .then(() => {
      const hashedMessage = web3.utils.soliditySha3(currentAccount, 10, "check-in", 0);
      console.log("Hashed Message: ", hashedMessage)
      const signatureObj = web3.eth.accounts.sign(hashedMessage, '0x93856d655b8ecd9ebff0f2c3c5d614834ecf76b66b6fca8ad6fc37381c1989b4')
      console.log("signature: ", signatureObj.signature);
      const signature = signatureObj.signature

      const r = signature.slice(0, 66);
      const s = "0x" + signature.slice(66, 130);
      const v = parseInt(signature.slice(130, 132), 16);
      console.log({ r, s, v });

      alert(signature);
      reward(currentAccount, '0xcbffe3fa9226a7cD7CfFC770103299B83518F538', 10, "check-in", 0, signature)
    })
    return temp.toString();
  } catch (error) {
    if (error.code === 4001) toast.error('Người dùng từ chối!')
    else {
      toast.error(error)
      console.log(error)
    }
    return "";
  }
}


export default reviewTrip;