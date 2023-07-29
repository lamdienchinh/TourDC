
import Web3 from 'web3'
import TokenArtifact from "../../contracts/TouristConTract.json"
import contractAddress from "../../contracts/contract-address.json";
import { toast } from 'react-toastify';

export async function checkIn(currentAccount, ticketID, placeId) {
  const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');
  const contract = new web3.eth.Contract(TokenArtifact.abi, contractAddress.Token);
  
  try {
    let txHash = await window.ethereum
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
    if(txHash) {
      console.log('txHash', txHash)
      return txHash;
    } else return -1;
  } catch (error) {
    console.log(error)
    if (error.code === 4001) {
      toast.error("Người dùng từ chối!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
})
    }
  }
}