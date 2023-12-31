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
    // let gas = web3.utils.toHex(web3.utils.toWei('1', 'gwei'));
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
      const txHash = await web3.utils.sha3(serializedTx);
      console.log("txHash", txHash)
      // try {
      //   let txHash = await web3.eth.sendSignedTransaction(raw)
      //   console.log("txHash: ", txHash);

      // } catch (error) {
      //   console.log(error)
      // } 
      web3.eth.sendSignedTransaction( raw );
      res.status(200).json({ txHash });
    },
    autoReview: async (req, res) => {
      const walletAddress = req.body.walletAddress;
      const privateKey = req.body.privateKey.slice(2);
      const privateKeyBuffer = Buffer.from(privateKey, 'hex')
      console.log("privateKey:", privateKey);
      console.log("publicKey:", walletAddress)
      // console.log("walletAddress: ", walletAddress)
      // console.log("user: ", user)
      console.log("placeId: ", req.body.placeId)
      console.log("tripId: ", req.body.tripId)
      console.log("comment: ", req.body.comment)
      console.log("rate: ", req.body.rate)
      console.log("title: ", req.body.title)
      console.log("signer: ", req.body.signer)
      console.log("to: ", req.body.to)
      console.log("amount: ", req.body.amount)
      console.log("message: ", req.body.message)
      console.log("nonce: ", req.body.nonce)
      console.log("signature: ", req.body.signature)
      let nonce = await web3.eth.getTransactionCount(walletAddress,'latest');
      let data = contract.methods.review(req.body.placeId, req.body.tripId, req.body.comment, req.body.rate, req.body.title,
        req.body.signer,req.body.to, req.body.amount, req.body.message,  req.body.nonce, req.body.signature).encodeABI();
      let gas = web3.utils.toHex(web3.utils.toWei('1', 'gwei'));
      // let estimateGas = await contract.methods.review(req.body.placeId, req.body.tripId, req.body.comment, req.body.rate, req.body.title,
      //   req.body.signer,req.body.to, req.body.amount, req.body.message,  req.body.nonce, req.body.signature).estimateGas({gas: 3000000000});
      //   console.log(estimateGas)
      // function review(uint placeId, uint idTrip, string memory comment, uint rate, string memory title,
      // address signer, address to, uint8 amount, string memory message, uint256 nonce, bytes memory signature)
      console.log("placeId", req.body.placeId)
      const txObject = {
        nonce: web3.utils.toHex(nonce),
        from: walletAddress,
        gasLimit: web3.utils.toHex(8000000), // Raise the gas limit to a much higher amount
        // gasPrice: web3.eth.getGasPrice(),
        // gasPrice: '0x09184e72a000',
        // gasLimit: '0x2710',
        gasPrice: web3.utils.toHex(100000000),
        to: contractAddress.Token,
        data: data,
      }  
      // console.log("txObj", txObject)
    
      const tx = new Tx(txObject)
      // console.log("newtxObj", tx)
      tx.sign(privateKeyBuffer)
    
      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')	
      const txHash = await web3.utils.sha3(serializedTx);
      console.log("txHash", txHash)

      web3.eth.sendSignedTransaction( raw );
      res.status(200).json({ txHash });
    },
  autoPurchase: async (req, res) => {
    const walletAddress = req.body.walletAddress;
    const privateKey = req.body.privateKey.slice(2);
    const privateKeyBuffer = Buffer.from(privateKey, 'hex');
    let nonce = await web3.eth.getTransactionCount(walletAddress,'latest');
    
    let data = contract.methods.exchangeVoucher(req.body.voucherID, req.body.signer, walletAddress, req.body.amount, req.body.message, req.body.nonce, req.body.signature).encodeABI();
    const txObject = {
      nonce: web3.utils.toHex(nonce),
      from: walletAddress,
      gasLimit: web3.utils.toHex(8000000), // Raise the gas limit to a much higher amount
      // gasPrice: web3.eth.getGasPrice(),
      // gasPrice: '0x09184e72a000',
      // gasLimit: '0x2710',
      gasPrice: web3.utils.toHex(100000000),
      to: contractAddress.Token,
      data: data,
    }
    const tx = new Tx(txObject)
    tx.sign(privateKeyBuffer)
    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')	
    const txHash = web3.utils.sha3(serializedTx);
    web3.eth.sendSignedTransaction(raw)
    .on('transactionHash', (hash) => {
      console.log('Transaction hash:', hash);
      // Mã hash của giao dịch đã được gửi lên blockchain
      // Bạn có thể thông báo cho người dùng ở đây hoặc thực hiện các hành động khác liên quan đến giao dịch
      // res.status(200).json({ txHash: hash });
    })
    .on('receipt', (receipt) => {
      console.log('Transaction receipt:', receipt);
      // Giao dịch đã được chấp nhận và được kết thúc
      // Bạn có thể xác nhận rằng giao dịch đã thành công ở đây
      res.status(200).json({ receipt: txHash });

    })
    .on('error', (error) => {
      console.error('Error while sending transaction:', error);
      res.status(500).json({ error: 'Failed to send transaction.' });
    });
    // res.status(200).json({ txHash });
  }
}

module.exports = transactionController;

