import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import './css/VoucherDetail.scss'; // Import CSS mới
import { useSelector } from "react-redux"
import { getInfor } from "../../state/selectors"
import { checkVoucher, saleVoucher } from '../../service/api';
import { createAxios } from "../../utils/createInstance"
import { setInfor } from "../../state/userSlice"
import { useDispatch } from 'react-redux';
const VoucherDetail = ({ product }) => {
    const user = useSelector(getInfor)
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch, setInfor);
    const salevoucher = async () => {
        //Kiểm tra số dư của User:
        //Gọi hàm tới BE
        // Check còn voucher không ?
        let check = await checkVoucher(product._id);
        if (check === 1) {
            //Xử Lý SC
            let trHash = "";

            //Success Lưu bên BE
            let data = {
                voucherDetail: product._id,
                trHash: trHash,
            }
            let token = user.accessToken;
            let sale = await saleVoucher(data, token, axiosJWT);
            console.log("Kết quả bán", sale)
        }
        else {
            // Hết Vouchers
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
