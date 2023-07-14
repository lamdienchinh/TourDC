import React, { useState } from 'react';
import Container from '@mui/material/Container';
import { TextField, Paper, Rating, Typography, ImageList, ImageListItem } from "@mui/material";
import img from "../../assets/imgs/place1.png"
import './css/ViewAlbum.scss';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const ViewAlbum = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [imgs] = useState([img, img, img, img]);
    const handleLocationClick = (location) => {
        setSelectedLocation(location);
    };
    const locations = [
        {
            id: 1,
            name: 'Địa điểm 1',
            description: 'Cảm nghĩ địa điểm 1...',
            image: 'url-to-image-1',
        },
        {
            id: 2,
            name: 'Địa điểm 2',
            description: 'Cảm nghĩ địa điểm 2...',
            image: 'url-to-image-2',
        },
        // Các địa điểm khác...
    ];

    return (
        <div className="viewalbum">
            <div className="viewalbum-slide">
                Album lưu giữ kỷ niệm
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/album">
                        Album
                    </Link>
                    <Typography color="text.primary">View Album</Typography>
                </Breadcrumbs>
            </div>
            <Container maxWidth="lg">
                <div className="viewalbum__body">
                    <div className="viewalbum__sidebar">
                        <h2 className="viewalbum__title">Danh sách địa điểm</h2>
                        <ul className="viewalbum__location-list">
                            {locations.map((location) => (
                                <li
                                    key={location.id}
                                    className={`viewalbum__location-item ${selectedLocation?.id === location.id ? 'active' : ''}`}
                                    onClick={() => handleLocationClick(location)}
                                >
                                    {location.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="viewalbum__content">
                        {/* {selectedLocation ? (
                            <div className="viewalbum__location-details">
                                <h3 className="viewalbum__location-name">{selectedLocation.name}</h3>
                                <p className="viewalbum__location-description">{selectedLocation.description}</p>
                                <img src={selectedLocation.image} alt={selectedLocation.name} className="viewalbum__location-image" />
                            </div>
                        ) : (
                            <p className="viewalbum__empty-message">Chọn một địa điểm để xem thông tin chi tiết</p>
                        )} */}
                        <div className="form-container">
                            <h2 className="viewalbum__album-title">Tên Cuốn Album</h2>
                            <div>
                                <Typography>Thời gian: {selectedLocation?.time} 13:00 7/9/2023</Typography>
                                <label>
                                    Rating:
                                    <Rating
                                        name="rating"
                                        value={selectedLocation?.rating}
                                        readOnly
                                    />
                                </label>
                                <label>
                                    <TextField
                                        disabled
                                        id="filled-size-normal"
                                        label="TIÊU ĐỀ"
                                        size='medium'
                                        value={selectedLocation?.title}

                                    />
                                </label>
                                <label>
                                    <TextField
                                        disabled
                                        id="outlined-controlled"
                                        label="CẢM NGHĨ"
                                        value={`${selectedLocation?.thoughts} Hello`}
                                        multiline

                                    />
                                </label>
                                <label>
                                    {/* <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Input
                                                type="file"
                                                inputProps={{ multiple: true }}
                                                onChange={handleImageUpload}
                                                text="Nhập ảnh"
                                            />
                                        </Grid>
                                    </Grid> */}
                                    <ImageList sx={{ width: 800, height: 450 }} cols={3} rowHeight={164}>
                                        {imgs && imgs.map((image, index) => (
                                            <ImageListItem key={index}>
                                                <Paper>
                                                    <img
                                                        src={`${image}?w=164&h=164&fit=crop&auto=format`}
                                                        srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                        alt={`Hình ${index}`}
                                                        loading="lazy"
                                                        style={{ width: '100%' }}
                                                    />
                                                </Paper>
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                    {/* <Grid container spacing={2}>
                                        {selectedImages && Array.from(selectedImages).map((image, index) => (
                                            <Grid item xs={3} key={index}>
                                                <Paper>
                                                    <img src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ width: "100%" }} />
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid> */}
                                </label>
                            </div>
                            {/* <button onClick={handleSave}>Lưu</button> */}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default ViewAlbum;