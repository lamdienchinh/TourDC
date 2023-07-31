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
    const [purchaseDate, setPurchaseDate] = useState(voucher.createdAt);
    function formatDateTime(dateTimeStr) {
        // Chuyển chuỗi thành đối tượng Date
        const dateObj = new Date(dateTimeStr);

        // Lấy thông tin về ngày, tháng, năm, giờ, phút, giây
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');

        // Tạo chuỗi định dạng ngày/tháng/năm giờ:phút:giây
        const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        return formattedDateTime;
    }

    return (
        <Box className="purchased-voucher-item">
            <div className="voucher-image-container">
                <img className="voucher-image" src={voucher.detail.img} alt={voucher.detail.name} />
            </div>
            <Typography variant="subtitle1">Ngày mua: {formatDateTime(purchaseDate)}</Typography>
            <Typography variant="h5">{voucher.detail.name}</Typography>
            <Typography variant="subtitle1">Price: {voucher.detail.price}</Typography>
            <div className="voucher__verify">
                <a href={`https://sepolia.etherscan.io/tx/${voucher.trHash}`} rel="noopener noreferrer" target="_blank">Xác thực trao đổi</a>
            </div>
            <Typography variant="body1">{voucher.detail.description}</Typography>
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
