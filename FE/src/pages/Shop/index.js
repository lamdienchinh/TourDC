import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Box, TextField, Button } from '@mui/material';
import VoucherDetail from '../../components/voucherdetail';
import list from "../../constants";
import './css/Shop.scss';
import { Container } from '@mui/material';
import { getAllVouchers } from '../../service/api';

const VoucherShop = () => {
    const [allVouchers, setAllVouchers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState(list.products);
    const [filterPriceMin, setFilterPriceMin] = useState('');
    const [filterPriceMax, setFilterPriceMax] = useState('');
    const itemsPerPage = 8; // Số sản phẩm trên mỗi trang
    const totalPages = Math.ceil(products.length / itemsPerPage);
    
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Filter theo giá khoảng
    const handleFilterByPriceRange = () => {
        const minPrice = parseFloat(filterPriceMin);
        const maxPrice = parseFloat(filterPriceMax);
        if (!minPrice && !maxPrice) {
            setProducts(list.products); // Sử dụng danh sách ban đầu khi không filter giá
        } else {
            const filteredProducts = list.products.filter(product => {
                const productPrice = parseFloat(product.price.slice(1));
                return (!minPrice || productPrice >= minPrice) && (!maxPrice || productPrice <= maxPrice);
            });
            setProducts(filteredProducts);
        }
        setCurrentPage(1); // Reset lại trang khi thực hiện filter
    };

    // Tìm kiếm theo tên
    const handleSearchByName = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredProducts = list.products.filter(product => product.name.toLowerCase().includes(searchValue));
        setProducts(filteredProducts);
        setCurrentPage(1); // Reset lại trang khi thực hiện tìm kiếm
    };

    useEffect(() => {
        const fetchVouchers = async () => {
            let data = await getAllVouchers();
            setAllVouchers(data);
        }
        fetchVouchers();
    },[])
    return (
        <Container maxWidth="lg">
            <Box className="product-list-container">
                <div className="sidebar">
                    {/* Thêm các loại sản phẩm vào đây */}
                </div>
                <div className="product-list">
                    <div className="filter-bar">
                        <TextField
                            type="number"
                            label="Giá từ"
                            variant="outlined"
                            size="small"
                            value={filterPriceMin}
                            onChange={(e) => setFilterPriceMin(e.target.value)}
                        />
                        <TextField
                            type="number"
                            label="Giá đến"
                            variant="outlined"
                            size="small"
                            value={filterPriceMax}
                            onChange={(e) => setFilterPriceMax(e.target.value)}
                        />
                        <TextField
                            label="Tìm kiếm theo tên"
                            variant="outlined"
                            size="small"
                            onChange={handleSearchByName}
                        />
                        <Button variant="contained" color="primary" onClick={handleFilterByPriceRange}>
                            Lọc giá
                        </Button>
                    </div>
                    <Grid container spacing={2}>
                        {allVouchers.slice(startIndex, endIndex).map((voucher, index) => (
                            <Grid key={index} item xs={12} sm={6} md={3}>
                                <div className="product-item">
                                    <VoucherDetail product={voucher} />
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                    {/* Hiển thị phân trang */}
                    <div className="shop__pagination">
                        <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} sx={{ marginTop: 2 }} />
                    </div>
                </div>
            </Box>
        </Container>
    );
};

export default VoucherShop;