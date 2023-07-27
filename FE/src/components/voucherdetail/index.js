import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import './css/VoucherDetail.scss'; // Import CSS mới
import { useSelector } from "react-redux"
import { getInfor, getUserData } from "../../state/selectors"
import { checkVoucher, saleVoucher, getBalanceOf } from '../../service/api';
import { createAxios } from "../../utils/createInstance"
import { setInfor } from "../../state/userSlice"
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Web3 from 'web3';
import { purchaseVoucher } from '../../service/api';
const web3 = new Web3('https://sepolia.infura.io/v3/c6b95d3b003e40cda8dcf76f7ba58be8');

const VoucherDetail = ({ product }) => {
    const user = useSelector(getInfor)
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch, setInfor);
    const currentAccount = useSelector(getUserData);
    const salevoucher = async () => {
        //Kiểm tra số dư của User:
        const balanceWei = await getBalanceOf(currentAccount);
        const balanceEther = Number(balanceWei)/(10 ** 18)
        console.log("Balance: ", balanceEther);
        if (balanceEther < product.price) {
            toast.error('Unable to buy, please check your balance !', {
                position: "bottom-center",
                autoClose: 1000,
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

                // const r = signature.slice(0, 66);
                // const s = "0x" + signature.slice(66, 130);
                // const v = parseInt(signature.slice(130, 132), 16);
                // console.log({ r, s, v });
                // gọi SC thực hiện hàm mua voucher
                try {
                    let trHash = await purchaseVoucher(product._id,"0xcbffe3fa9226a7cD7CfFC770103299B83518F538", currentAccount,product.price,product.name,0,signature);
                    console.log("trHash: ", trHash);
                    //Success Lưu bên BE 
                    let data = {
                        voucherDetail: product._id,
                        trHash: trHash,
                    }
                    let token = user.accessToken;
                    let sale = await saleVoucher(data, token, axiosJWT);
                    console.log("Kết quả bán", sale)
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                // Hết Vouchers
            }
        }
       
    }
    return (
        <Box className="product-detail">
            <Card>
                <CardActionArea>
                    <CardMedia className="product-image" component="img" height="400" image={product.img} alt={product.name} >
                    </CardMedia>
                    <Button className="buy-button" variant="contained" color="primary" onClick={salevoucher}>
                        Mua
                    </Button>
                    <CardContent>
                        <Typography variant="h5">{product.name}</Typography>
                        <Typography variant="subtitle1">Price: {product.price}</Typography>
                        <Typography variant="body1">{product.description}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
};

export default VoucherDetail;
