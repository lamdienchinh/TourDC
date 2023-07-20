import Web3 from 'web3'
import TokenArtifact from "../../contracts/TouristConTract.json"
import contractAddress from "../../contracts/contract-address.json";

// function lưu data review vào blockchain
const reviewTrip = async (currentAccount, placeID, arrDate, comment, rate, title) => {
  try {
    const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');
    const contract = new web3.eth.Contract(TokenArtifact.abi, contractAddress.Token);
    let check = await window.ethereum
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
    console.log(check)
  }
  catch (err) {
    return "1"
  }
  // await window.ethereum
  //   .request({
  //     method: 'eth_sendTransaction',
  //     params: [
  //       {
  //         from: currentAccount,
  //         to: contractAddress.Token,
  //         gasLimit: '0x5028', // Customizable by the user during MetaMask confirmation.
  //         maxPriorityFeePerGas: '0x3b9aca00', // Customizable by the user during MetaMask confirmation.
  //         maxFeePerGas: '0x2540be400', // Customizable by the user during MetaMask confirmation.
  //         data: contract.methods.review(placeID, arrDate, comment, rate, title).encodeABI()
  //       },
  //     ],
  //   })
  //   .then((txHash) => console.log("txHash: ", txHash))
  //   .catch((error) => {
  //     throw error;
  //   })
}
export default reviewTrip;