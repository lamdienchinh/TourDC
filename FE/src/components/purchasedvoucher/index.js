import React, { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import "./css/PurchasedVoucher.css"
const PurchasedVoucherItem = ({ voucher, onUseVoucher }) => {
    console.log(voucher)
    const [openDialog, setOpenDialog] = useState(false);

    const handleUseVoucher = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmUseVoucher = () => {
        onUseVoucher(voucher);
        setOpenDialog(false);
    };
    const [purchaseDate, setPurchaseDate] = useState(voucher.purchaseDate);


    return (
        <Box className="purchased-voucher-item">
            <div className="voucher-image-container">
                <img className="voucher-image" src={voucher.imageUrl} alt={voucher.name} />
            </div>
            <Typography variant="subtitle1">Ngày mua: {purchaseDate}</Typography>
            <Typography variant="h5">{voucher.name}</Typography>
            <Typography variant="subtitle1">Price: {voucher.price}</Typography>
            <Typography variant="body1">{voucher.description}</Typography>
            <Button variant="contained" color="primary" onClick={handleUseVoucher} disabled={voucher.used}>
                {voucher.used ? 'Đã sử dụng' : 'Sử dụng'}
            </Button>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Xác nhận sử dụng voucher</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc muốn sử dụng voucher này?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleConfirmUseVoucher} color="primary" autoFocus>
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PurchasedVoucherItem;
