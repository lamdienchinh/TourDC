import React, { useState, useEffect } from 'react';
import { Container, Pagination, Box, ImageList, ImageListItem, Button, NativeSelect, InputLabel, FormControl } from '@mui/material';
import Trip from "../../components/trip";
import trips from "../../constants";
import "./css/Trips.scss";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Paper, DialogContentText } from '@mui/material'
import Draggable from 'react-draggable';
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import Skeleton from '@mui/material/Skeleton';
import config from "../../constants"
import Rating from '@mui/material/Rating';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const Trips = () => {
    const uploader = Uploader({ apiKey: "public_kW15bW94Lbmj25TACS55UzraugpF" });
    const options = config.options
    const [allTrips, setAllTrips] = useState([]);
    const [select, setSelect] = useState(1);
    const [selectTrip, setSelectTrip] = useState();
    const [style, setStyle] = useState()
    console.log(style);
    // const [getplace, setGetPlaces] = useState(0);
    // const [trips, setTrips] = useState([]);
    const [row1, setRow1] = useState([]);
    const [row2, setRow2] = useState([]);
    // const [row3, setRow3] = useState([]);
    // const [row4, setRow4] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [value, setValue] = useState(dayjs('2022-04-17T15:30'));
    const [scroll, setScroll] = useState('paper');
    //Lấy place để hiển thị
    const [isLoading, setIsLoading] = useState(true)
    //handle chọn trang
    const handlePageChange = (event, number) => {
        setSelect(number);
    }
    const [rating, setRating] = React.useState(0);

    const handleRatingChange = (event, value) => {
        setRating(value);
    };
    useEffect(() => {
        var style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            height: '90%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };
        let array = Array.from({ length: 32 }, () => ({ ...trips.trips }));
        setAllTrips(array);
        setStyle(style);
        // console.log(trips);
        // setTrips();
        setIsLoading(false)
    }, []);

    useEffect(() => {
        let start = 12 * (select - 1);
        let end = start + 12;
        if (end > allTrips.length) end = allTrips.length;
        const temp = allTrips.slice(start, end);

        const totalPages = Math.ceil(allTrips.length / 12);

        const row1 = temp.slice(0, 2);
        const row2 = temp.slice(2, 4);
        // const row3 = temp.slice(6, 9);
        // const row4 = temp.slice(9, 12);

        setRow1(row1);
        setRow2(row2);
        // setRow3(row3);
        // setRow4(row4);
        setTotalPages(totalPages);
    }, [select, allTrips]);

    const [open, setOpen] = useState(false);
    const handleOpen = (trip) => {
        setSelectTrip(trip);
        setOpen(true);
        setScroll(scroll);
    }
    const handleClose = () => setOpen(false);
    return (
        <div className="trip-wrapper">
            <div className="trip-slide">
                Khám phá những chuyến đi của bạn
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/album">
                        Album
                    </Link>
                    <Typography color="text.primary">Trips</Typography>
                </Breadcrumbs>
            </div>
            <Container maxWidth="lg">
                <div className="trips">
                    <div className="trips-col1">
                        <h1>Sắp xếp</h1>
                        <FormControl fullWidth className="trips-filter">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">Tên tiêu đề</InputLabel>
                            <NativeSelect
                                defaultValue={1}
                            // onChange={handleChange}
                            >
                                <option value={1}>A-Z ASC</option>
                                <option value={2}>Z-A DASC</option>
                            </NativeSelect>
                        </FormControl>
                        <FormControl fullWidth className="trips-filter">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">Ngày tạo</InputLabel>
                            <NativeSelect
                                defaultValue={1}
                            // onChange={handleChange}
                            >
                                <option value={1}>Mới nhất</option>
                                <option value={2}>Cũ nhất</option>
                            </NativeSelect>
                        </FormControl>
                        <h1>Chọn ngày Checkin</h1>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Chọn ngày"
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="trips-col2">
                        {isLoading === true ? <div>
                            <div><Skeleton height="100%" /></div>
                            <div><Skeleton height="100%" /></div>
                        </div> : <div className="trips__results--1">
                            {row1 && row1.map((item, itemIndex) => (
                                <div onClick={() => handleOpen(item)}> <Trip trip={item}></Trip></div>
                            ))}
                        </div>}
                        {isLoading === true ? <div>
                            <div><Skeleton height="100%" /></div>
                            <div><Skeleton height="100%" /></div>
                        </div> : <div className="trips__results--2">
                            {row2 && row2.map((item, itemIndex) => (
                                <div onClick={() => handleOpen(item)}> <Trip trip={item}></Trip></div>
                            ))}
                        </div>}
                        {/* <div className="trips__results--3">
                    {row3 && row3.map((item, itemIndex) => (
                        <div onClick={() => handleOpen(item)}> <Trip trip={item}></Trip></div>
                    ))}
                </div>
                <div className="trips__results--4">
                    {row4 && row4.map((item, itemIndex) => (
                        <div onClick={() => handleOpen(item)}> <Trip trip={item}></Trip></div>
                    ))}
                </div> */}
                        <div className="trips__results--pagination">
                            <Pagination count={totalPages} onChange={handlePageChange} showFirstButton showLastButton />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog
                        fullWidth={true}
                        maxWidth="xl"
                        open={open}
                        onClose={handleClose}
                        PaperComponent={PaperComponent}
                        aria-labelledby="draggable-dialog-title"
                        scroll='paper'
                    >
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                            NÊU CẢM NGHĨ VỀ CHUYẾN ĐI
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Thời gian: {selectTrip?.time}
                            </DialogContentText>
                            <div className="trip-form">
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '100%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <h2>Đánh giá</h2>
                                    <Rating name="rating"
                                        value={rating}
                                        onChange={handleRatingChange}></Rating>
                                    <div className="tripinfor-form">
                                        <TextField
                                            required
                                            id="standard-required"
                                            label="Tiêu đề"
                                            placeholder='Nhập tiêu đề'
                                            variant="standard"
                                            fullWidth
                                        />
                                        <TextField
                                            required
                                            id="standard-required"
                                            label="Cảm nghĩ"
                                            placeholder='Nhập cảm nghĩ'
                                            variant="standard"
                                            multiline
                                            rows={4}
                                            fullWidth
                                        />
                                    </div>
                                </Box>
                                <UploadButton uploader={uploader}         // Required.
                                    options={options}           // Optional.
                                    onComplete={files => {      // Optional.
                                        if (files.length === 0) {
                                            console.log('No files selected.')
                                        } else {
                                            console.log('Files uploaded:');
                                            console.log(files.map(f => f.fileUrl));
                                        }
                                    }}>
                                    {({ onClick }) =>
                                        <Button onClick={onClick} variant="contained" >
                                            Upload ảnh
                                        </Button>
                                    }
                                </UploadButton>
                                <ImageList sx={{ width: 600, height: 350 }} cols={3} rowHeight={164}>
                                    {selectTrip?.images.map((item) => (
                                        <ImageListItem key={item.url}>
                                            <img
                                                src={`${item.url}?w=161&fit=crop&auto=format`}
                                                srcSet={`${item.url}?w=161&fit=crop&auto=format&dpr=2 2x`}
                                                alt={`Đây là ảnh thứ ${item.id}`}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={(event) => handleClose(event, 0)}>
                                Huỷ
                            </Button>
                            <Button onClick={(event) => handleClose(event, 1)}>Lưu</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>
        </div>
    );
};

export default Trips;