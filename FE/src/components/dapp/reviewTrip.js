import Web3 from 'web3'
import TokenArtifact from "../../contracts/TouristConTract.json"
import contractAddress from "../../contracts/contract-address.json";
import { toast } from "react-toastify"

// function lưu data review vào blockchain
const reviewTrip = async (currentAccount,placeID, arrDate , comment, rate, title) => {
  const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');
  const contract = new web3.eth.Contract(TokenArtifact.abi, contractAddress.Token);
  try {
  let temp = await window.ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: currentAccount,
          to: contractAddress.Token,
          gasLimit: '0x5028', // Customizable by the user during MetaMask confirmation.
          maxPriorityFeePerGas: '0x3b9aca00', // Customizable by the user during MetaMask confirmation.
          maxFeePerGas: '0x2540be400', // Customizable by the user during MetaMask confirmation.
          data: contract.methods.review(placeID, arrDate, comment, rate, title).encodeABI()
        },
      ],
    })
    toast.success("Lưu cảm nghĩ thành công!")
    return temp.toString();
  } catch (error) {
    toast.error('Người dùng từ chối!')
    return "";
  }
    // .then((txHash) => {
    //    console.log("txHash: ", txHash)
    //    transactionHash = txHash;
    //   })
    // catch((error) => {
    //   console.error(error)
    //   throw error;
    // })
    // return transactionHash;
}
export default reviewTrip;