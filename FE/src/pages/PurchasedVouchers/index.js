import React, { useEffect, useState } from 'react';
import PurchasedVoucherItem from '../../components/purchasedvoucher';
// import list from "../../constants";
import "./css/PurchasedVouchers.scss";
import { useSelector } from "react-redux";
import { getInfor } from "../../state/selectors"

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
    Breadcrumbs,
    Link
} from '@mui/material';
import { getMyVouchers } from '../../service/api';
import { createAxios } from "../../utils/createInstance"
import { setInfor } from '../../state/userSlice';
import { useDispatch } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import Loading from "../../components/loading"

const itemsPerPage = 8; // Số sản phẩm trên mỗi trang

const PurchasedVouchers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const handleClose = () => {
        setIsLoading(false);
    };
    const user = useSelector(getInfor)
    const [currentPage, setCurrentPage] = useState(1);
    const [purchasedVouchers, setPurchasedVouchers] = useState([]);
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch, setInfor)
    const totalPages = Math.ceil(purchasedVouchers.length / itemsPerPage);

    const handleUseVoucher = (voucher) => {
        // Update the voucher status to "used" here
        const updatedVouchers = purchasedVouchers.map(v => v.id === voucher.id ? { ...v, used: true } : v);
        setPurchasedVouchers(updatedVouchers);
    };

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;

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
    const [displayedVouchers, setDisplayedVouchers] = useState([])
    useEffect(() => {
        const fetchVouchers = async () => {
            let token = user.accessToken
            const vouchers = await getMyVouchers(token, axiosJWT)
            console.log(vouchers)
            setPurchasedVouchers(vouchers)
            setIsLoading(false)
        }
        fetchVouchers();
    }, [])

    return (
        <div className="voucher__wrapper">
            <Backdrop
                sx={{ color: '#fffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                onClick={handleClose}
            >
                {/* <CircularProgress color="inherit" /> */}
                <Loading></Loading>
            </Backdrop>
            <div className="voucher__slides">
                <div className="voucher__slides__content">
                    Mua sắm vouchers
                </div>
                <div className="voucher__slides_breadcumb">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="black" href="/">
                            Trang chủ
                        </Link>
                        <Typography color="text.primary">Quà đã đổi</Typography>
                    </Breadcrumbs>
                </div>
            </div>
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
                    <Typography variant="h2">Voucher của tôi</Typography>
                    <Box className="voucher-list">
                        {purchasedVouchers.map((voucher) => (
                            <PurchasedVoucherItem key={voucher.id} voucher={voucher} onUseVoucher={handleUseVoucher} />
                        ))}
                    </Box>
                    {/* Hiển thị phân trang */}
                    <div className="purchased__voucher__pagi">
                        <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} sx={{ marginTop: 2 }} />
                    </div>
                </Box>
            </Container>
        </div>
    );
};

export default PurchasedVouchers;
