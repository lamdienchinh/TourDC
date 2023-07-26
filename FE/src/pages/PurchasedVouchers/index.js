import React, { useState } from 'react';
import PurchasedVoucherItem from '../../components/purchasedvoucher';
import list from "../../constants";
import "./css/PurchasedVouchers.scss";
import {
    Box,
    Typography,
    Pagination,
    Container,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

const itemsPerPage = 8; // Số sản phẩm trên mỗi trang

const PurchasedVouchers = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [purchasedVouchers, setPurchasedVouchers] = useState(list.products);

    const totalPages = Math.ceil(purchasedVouchers.length / itemsPerPage);

    const handleUseVoucher = (voucher) => {
        // Update the voucher status to "used" here
        const updatedVouchers = purchasedVouchers.map(v => v.id === voucher.id ? { ...v, used: true } : v);
        setPurchasedVouchers(updatedVouchers);
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [searchTerm, setSearchTerm] = useState('');
    const [filterUsed, setFilterUsed] = useState('all');
    const [filterPrice, setFilterPrice] = useState('all');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleFilterUsedChange = (event) => {
        setFilterUsed(event.target.value);
    };

    const handleFilterPriceChange = (event) => {
        setFilterPrice(event.target.value);
    };

    const handleFilterStartDateChange = (event) => {
        setFilterStartDate(event.target.value);
    };

    const handleFilterEndDateChange = (event) => {
        setFilterEndDate(event.target.value);
    };

    const displayedVouchers = purchasedVouchers
        .filter((voucher) => {
            const lowerCaseName = voucher.name.toLowerCase();
            return lowerCaseName.includes(searchTerm);
        })
        .filter((voucher) => {
            if (filterUsed === 'all') {
                return true;
            } else if (filterUsed === 'used') {
                return voucher.used;
            } else {
                return !voucher.used;
            }
        })
        .filter((voucher) => {
            if (filterPrice === 'all') {
                return true;
            } else if (filterPrice === 'above') {
                return parseFloat(voucher.price.slice(1)) > 100; // Thay 100 bằng giá muốn filter
            } else {
                return parseFloat(voucher.price.slice(1)) <= 100; // Thay 100 bằng giá muốn filter
            }
        })
        .filter((voucher) => {
            if (filterStartDate === '' || filterEndDate === '') {
                return true;
            }
            const startDate = new Date(filterStartDate);
            const endDate = new Date(filterEndDate);
            const purchaseDate = new Date(voucher.purchaseDate);
            return purchaseDate >= startDate && purchaseDate <= endDate;
        });

    return (
        <Container maxWidth="lg">
            <div className="filter-bar">
                <TextField
                    label="Tìm kiếm theo tên"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <FormControl variant="outlined" size="small">
                    <InputLabel>Trạng thái sử dụng</InputLabel>
                    <Select value={filterUsed} onChange={handleFilterUsedChange} label="Trạng thái sử dụng">
                        <MenuItem value="all">Tất cả</MenuItem>
                        <MenuItem value="used">Đã sử dụng</MenuItem>
                        <MenuItem value="unused">Chưa sử dụng</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" size="small">
                    <InputLabel>Giá</InputLabel>
                    <Select value={filterPrice} onChange={handleFilterPriceChange} label="Giá">
                        <MenuItem value="all">Tất cả</MenuItem>
                        <MenuItem value="above">Trên 100</MenuItem>
                        <MenuItem value="below">Dưới hoặc bằng 100</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Từ ngày"
                    variant="outlined"
                    size="small"
                    type="date"
                    value={filterStartDate}
                    onChange={handleFilterStartDateChange}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { max: filterEndDate } }} // Thêm InputProps cho ngày bắt đầu
                />
                <TextField
                    label="Đến ngày"
                    variant="outlined"
                    size="small"
                    type="date"
                    value={filterEndDate}
                    onChange={handleFilterEndDateChange}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: filterStartDate } }} // Thêm InputProps cho ngày kết thúc
                />
            </div>
            <Box className="purchased-vouchers">
                <Typography variant="h2">Voucher đã mua</Typography>
                <Box className="voucher-list">
                    {displayedVouchers.map((voucher) => (
                        <PurchasedVoucherItem key={voucher.id} voucher={voucher} onUseVoucher={handleUseVoucher} />
                    ))}
                </Box>
                {/* Hiển thị phân trang */}
                <div className="purchased__voucher__pagi">
                    <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} sx={{ marginTop: 2 }} />
                </div>
            </Box>
        </Container>
    );
};

export default PurchasedVouchers;
