const { default: Web3 } = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const TokenArtifact = require("../../FE/src/contracts/TouristConTract.json")
const contractAddress = require("../../FE/src/contracts/contract-address.json")
const Common = require('ethereumjs-common').default;
const web3 = new Web3("https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8");
const contract = new web3.eth.Contract(TokenArtifact.abi, contractAddress.Token);

// const account1 = '0x218373FcebB6De9a1dCf1765BF836d47f5e52C86'
// const privateKey = Buffer.from('e64f313b01efdecf9f38203cc393e17eb158f3ad1bf829df0fc76c07806da002', 'hex')

// var rawTx = {
//   nonce: '0x00',
//   gasPrice: '0x09184e72a000',
//   gasLimit: '0x2DC6C0',
//   to: contractAddress.Token,
//   value: '0x00',
//   data: contract.methods.checkIn(10, 1).encodeABI()
// }
// const customChainParams = {
//   name: 'sepolia',
//   chainId: 11155111,
// };
// var customCommon = Common.forCustomChain('sepolia', customChainParams);
// var tx = new Tx(rawTx, { common: customCommon });
// tx.sign(privateKey);
// var serializedTx = tx.serialize();
// // console.log(serializedTx.toString('hex'));
// // 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f

// web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
// .on('receipt', console.log);


// const checkIn = async(ticketID, placeID) => {
// 	web3.eth.getTransactionCount(account1, (err, txCount) => {

// 		const txObject = {
// 			nonce:    web3.utils.toHex(txCount),
// 			gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
// 			// gasPrice: web3.eth.getGasPrice(),
// 			gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
// 			to: contractAddress,
// 			data: contract.methods.checkIn(ticketID, placeID).encodeABI()
			
// 		}
	
// 		const tx = new Tx(txObject)
// 		tx.sign(privateKey1)
	
// 		const serializedTx = tx.serialize()
// 		const raw = '0x' + serializedTx.toString('hex')	
	
// 		web3.eth.sendSignedTransaction(raw, (err, txHash) => {
// 			console.log('err:', err, 'txHash:', txHash)
// 			// Use this txHash to find the contract on Etherscan!
// 		})
// 	})
// }
// checkIn(9,1);


const transactionController = {
  autoCheckIn: async(req, res) => {
    // user, ticketID, placeId
    const publicKey = req.body.publicKey;
    const privateKey = req.body.privateKey.slice(2);
    
	  // const txCount = await web3.eth.getTransactionCount(publicKey,'latest')
    const privateKeyBuffer = Buffer.from(privateKey, 'hex')
    console.log(privateKey)
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
        data: data,
        
      }
      console.log("txObj", txObject)
      
      const tx = new Tx(txObject)
      console.log("newtxObj", tx)
      tx.sign(privateKeyBuffer)
    
      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')	
    
      await web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err, 'txHash:', txHash)
        })
      }
}

module.exports = transactionController;

