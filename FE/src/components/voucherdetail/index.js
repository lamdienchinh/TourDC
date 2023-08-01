import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import './css/VoucherDetail.scss'; // Import CSS mới
import { useSelector } from "react-redux"
import { getInfor, getUserData } from "../../state/selectors"
import { checkVoucher, saleVoucher, getBalanceOf } from '../../service/api';
import { createAxios } from "../../utils/createInstance"
import { setInfor } from "../../state/userSlice"
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { updateBalance } from '../../state/userSlice';
import Web3 from 'web3';
import { purchaseVoucher, autoPurchase } from '../../service/api';
import { getBalance } from '../../state/selectors';
import DCToken from '../../assets/imgs/DCToken.svg'
import Modal from 'react-bootstrap/Modal';
import { HashLoader } from 'react-spinners';
const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');

const VoucherDetail = ({ product }) => {
    const user = useSelector(getInfor)
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch, setInfor);
    const currentAccount = useSelector(getUserData);
    const balance = useSelector(getBalance);
    const [price, setPrice] = useState(0);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [confirm, setConfirm] = useState(false);
    console.log(balance)
    const salevoucher = async () => {
        //Kiểm tra số dư của User:
        
        const balanceWei = await getBalanceOf(currentAccount);
        const balanceEther = Number(balanceWei)/(10 ** 18)
        console.log("Balance: ", balanceEther);
        if (balance < product.price) {
            toast.error('Không thể mua, kiểm tra token của bạn!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        else {
             //Gọi hàm tới BE
            // Check còn voucher không ?
            setShow(true);
        }
    }
    const handlePurchase = async () => {
        setLoading(true)
        let check = await checkVoucher(product._id);
            if (check === 1) {
                console.log("id", product._id)
                console.log("currentAccount" ,currentAccount)
                console.log("product.price" ,product.name)
                
                // create signature
                const hashedMessage = web3.utils.soliditySha3(currentAccount, product.price,product.name, 0);
                console.log("Hashed Message: ", hashedMessage)
                const signatureObj = web3.eth.accounts.sign(hashedMessage, '0x93856d655b8ecd9ebff0f2c3c5d614834ecf76b66b6fca8ad6fc37381c1989b4')
                console.log("signature: ", signatureObj.signature);
                const signature = signatureObj.signature
                if(!user.privateKey) {
                    try {
                        let trHash = await purchaseVoucher(product._id,"0xcbffe3fa9226a7cD7CfFC770103299B83518F538", currentAccount,product.price,product.name,0,signature);
                        console.log("trHash: ", trHash);
                        // await web3.eth.getTransactionReceipt(trHash).then(
                        //     console.log
                        // )
                        let data = {
                            voucherDetail: product._id,
                            trHash: trHash,
                        }
                        let token = user.accessToken;
                        let sale = await saleVoucher(data, token, axiosJWT);
                        console.log("Kết quả bán", sale)
                        if(trHash !== -1 ) {
                            let type = product.price;
                            dispatch(updateBalance({type, balance}, dispatch));
                        }
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    try {
                        setLoading(true)
                        let trHash = await autoPurchase(user, product._id,"0xcbffe3fa9226a7cD7CfFC770103299B83518F538", product.price,product.name,0,signature)
                        .then(()=> {
                            setLoading(false);
                        });
                        console.log("trHash: ", trHash);
                        //Success Lưu bên BE 
                        // console.log("receipt", receipt)cl
                        let data = {
                            voucherDetail: product._id,
                            trHash: trHash,
                        }
                        let token = user.accessToken;
                        let sale = await saleVoucher(data, token, axiosJWT);
                        console.log("Kết quả bán", sale)
                        if(trHash !== -1 ) {
                            let type = product.price;
                            dispatch(updateBalance({type, balance}, dispatch));
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                
            }
            else {
                // Hết Vouchers
        }
        setShow(false)
        setLoading(false)
    }
    const handleClose = () => setShow(false);
    return (
        <Box className="product-detail">
            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="md"
            > 
                <Modal.Header closeButton>
                <Modal.Title>Xác nhận mua voucher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div style={{fontWeight: "bold",margin:"10px", justifyContent: "center"}}>
                    Bạn có chắc chắn sẽ mua voucher này chứ?  
                </div>
                {loading?  <div style={{fontWeight: "bold",margin:"10px", justifyContent: "center"}}>
                    Vui lòng đợi xác thực giao dịch.  
                </div> : null}
                <HashLoader 
                        loading={loading}
                        color="#36d7b7"
                        speedMultiplier="1"
                        cssOverride = {{
                            marginLeft: "13rem"
                        }}
                        />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Huỷ
                </Button>
                <Button variant="contained" color="primary" onClick={handlePurchase}>Chắc chắn</Button>
                </Modal.Footer>
            </Modal>
            <Card>
                <CardActionArea>                  
                    <CardMedia className="product-image" component="img" height="400" image={product.img} alt={product.name} >
                    </CardMedia>
                    <Button className="buy-button" variant="contained" color="primary" onClick={salevoucher}>
                        Mua
                    </Button>
                    <CardContent>
                        <Typography variant="h5">{product.name}</Typography>
                        <Typography variant="subtitle1">Price: {product.price}
                        <img id='token' src={DCToken}></img>
                        </Typography>
                        <Typography variant="body1">{product.description}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
};

export default VoucherDetail;
