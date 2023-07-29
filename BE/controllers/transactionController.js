const { default: Web3 } = require('web3');
const Tx = require('ethereumjs-tx');
const TokenArtifact = require("../../FE/src/contracts/TouristConTract.json")
const contractAddress = require("../../FE/src/contracts/contract-address.json")
const web3 = new Web3("https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8");
const contract = new web3.eth.Contract(TokenArtifact.abi, contractAddress.Token);

const transactionController = {
  autoCheckIn: async(req, res) => {
    // user, ticketID, placeId
    const publicKey = req.body.publicKey;
    const privateKey = req.body.privateKey.slice(2);
    
	  // const txCount = await web3.eth.getTransactionCount(publicKey,'latest')
    const privateKeyBuffer = Buffer.from(privateKey, 'hex')
    console.log("privateKey:", privateKey);
    console.log("publicKey:", publicKey)
    console.log("ticketID: ", req.body.ticketId),
    console.log("ticketID: ", req.body.placeId),
    console.log("privateKey: ", privateKey)
    console.log("data: ", contract.methods.checkIn(req.body.ticketId, req.body.placeId).encodeABI());
    console.log("privateKeyBuffer: ", privateKeyBuffer)
    let nonce = await web3.eth.getTransactionCount(publicKey,'latest');
    console.log("nonce:", nonce)
    let data = contract.methods.checkIn(req.body.ticketId, req.body.placeId).encodeABI();
    console.log("data", data)
    let gas = web3.utils.toHex(web3.utils.toWei('1', 'gwei'));
    let estimateGas = await contract.methods.checkIn(req.body.ticketId, req.body.placeId).estimateGas({gas: 1000000000});
    
      const txObject = {
        nonce: web3.utils.toHex(nonce),
        from: publicKey,
        gasLimit: web3.utils.toHex(estimateGas), // Raise the gas limit to a much higher amount
        // gasPrice: web3.eth.getGasPrice(),
        // gasPrice: '0x09184e72a000',
        // gasLimit: '0x2710',
        gasPrice: 1000000000,
        to: contractAddress.Token,
        data: contract.methods.checkIn(req.body.ticketId, req.body.placeId).encodeABI(),
        
      }
      console.log("txObj", txObject)
      
      const tx = new Tx(txObject)
      console.log("newtxObj", tx)
      tx.sign(privateKeyBuffer)
    
      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')	
      
      // try {
      //   let txHash = await web3.eth.sendSignedTransaction(raw)
      //   console.log("txHash: ", txHash);

      // } catch (error) {
      //   console.log(error)
      // } 
      web3.eth.sendSignedTransaction( raw ).on('receipt', (receipt) => {
        console.log("TxHash from Receipt: ", receipt.transactionHash )
        
        return receipt.transactionHash
      })
      return -1;
    }
}

module.exports = transactionController;

