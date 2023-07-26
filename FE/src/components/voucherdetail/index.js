import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import './css/VoucherDetail.scss'; // Import CSS mới

const VoucherDetail = ({ product }) => {
    return (
        <Box className="product-detail">
            <Card>
                <CardActionArea>
                    <CardMedia className="product-image" component="img" height="400" image={product.imageUrl} alt={product.name} >
                    </CardMedia>
                    <Button className="buy-button" variant="contained" color="primary">
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
