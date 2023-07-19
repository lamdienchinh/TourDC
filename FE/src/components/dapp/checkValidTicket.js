import Web3 from 'web3'
import TokenArtifact from "../../contracts/TouristConTract.json"
import contractAddress from "../../contracts/contract-address.json";


export async function checkValidTicket(input) {
  const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');
  const contract = new web3.eth.Contract(TokenArtifact.abi, contractAddress.Token);

  return await contract.methods.checkValidTicket(input).call()
}