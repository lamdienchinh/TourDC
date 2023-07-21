import React, { useState, useEffect } from 'react';
import { Container, Pagination, Box, Button, NativeSelect, InputLabel, FormControl } from '@mui/material';
import Trip from "../../components/trip";
// import trips from "../../constants";
import "./css/Trips.scss";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Paper, DialogContentText } from '@mui/material'
import Draggable from 'react-draggable';
import Skeleton from '@mui/material/Skeleton';
import Rating from '@mui/material/Rating';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { toast } from "react-toastify"
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'
// import axios from 'axios';
// import { doesSectionFormatHaveLeadingZeros } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';
import { useSelector } from 'react-redux'
import { getInfor, getUserData } from '../../state/selectors';
import { getAllTrips } from '../../components/dapp/getAllTrips';
import reviewTrip from '../../components/dapp/reviewTrip';
import { convertTimestampToVietnamTime } from '../../components/dapp/convertTime';
import { getTrips, reviewtoBE } from '../../service/api';
import { createAxios } from "../../utils/createInstance";
import { setInfor } from "../../state/userSlice";
import { useDispatch } from "react-redux";

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
    const [allTrips, setAllTrips] = useState([]);
    const [select, setSelect] = useState(1);
    const dispatch = useDispatch();
    const user = useSelector(getInfor)
    let axiosJWT = createAxios(user, dispatch, setInfor);
    
    // Fetch data từ blockchain
    const [journey, setJourneys] = useState([]);
    const [currentAccount, setCurrentAccount] = useState(useSelector(getUserData));
    const [userinfor, getUserInfor] = useState(useSelector(getInfor))
    const [update, setUpdate] = useState(true)
    useEffect(() => {
        const fetchData = async (currentAccount) => {

            // Thực hiện các bước để lấy dữ liệu infor
            const infor = await getAllTrips(currentAccount);
            console.log("infor:", infor)
            let temp = await getTrips(userinfor.accessToken, axiosJWT)
            console.log("Get Trip from BE", temp.data)
            temp = temp.data
            const mergedArray = infor.map((item1) => {
                const matchingElement = temp.find((item2) => item2.time === (item1.arrivalDate).toString());
                if (matchingElement) {
                    return { ...item1, ...matchingElement };
                } else {
                    return item1;
                }
            });
            console.log("Merge Array", mergedArray)
            setJourneys(mergedArray)
            setAllTrips(mergedArray)
        }
        fetchData(currentAccount);
        console.log("Trips: ", allTrips);
    }, [update]);



    const [selectTrip, setSelectTrip] = useState("");
    const [imgs, setImgs] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [row1, setRow1] = useState([]);
    const [row2, setRow2] = useState([]);
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
        event.preventDefault();
        setRating(value);
    };
    const handleTitleChange = (event) => {
        event.preventDefault();
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        event.preventDefault();
        setDescription(event.target.value);
    };
    useEffect(() => {
        setIsLoading(false)
    }, []);

    useEffect(() => {
        let start = 4 * (select - 1);
        let end = start + 4;
        if (end > allTrips.length) end = allTrips.length;
        const temp = allTrips.slice(start, end);

        const totalPages = Math.ceil(allTrips.length / 4);

        const row1 = temp.slice(0, 2);
        const row2 = temp.slice(2, 4);


        setRow1(row1);
        setRow2(row2);
        // setRow3(row3);
        // setRow4(row4);
        setTotalPages(totalPages);
    }, [select, allTrips]);

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    };

    const handleOpen1 = (trip) => {
        setSelectTrip(trip);
        setTitle(trip.title);
        setDescription(trip.review);
        setImgs(trip.list_imgs);
        setOpen1(true);
        setScroll(scroll);
    }
    const handleOpen2 = () => {
        setOpen2(true);
    }
    const handleClose1 = (event, action) => {
        event.preventDefault();
        if (action === 1) {
            handleOpen2();
        }
        else {
            setOpen1(false);
        }
    }
    const handleClose2 = async (event, action) => {
        event.preventDefault();
        console.log(selectTrip)
        if (action === 1) {
            let result = {
                rate: rating,
                list_imgs: imgs,
                title: title,
                description: description
            }
            // let review = await reviewTrip(currentAccount, selectTrip.placeId, selectTrip.arrivalDate, result.description, result.rate, result.title)
            // console.log("review:",review);
            let review = await toast.promise(
                reviewTrip(currentAccount, selectTrip.placeId, selectTrip.arrivalDate, result.description, result.rate, result.title),
                {
                    pending: 'Đang đợi xử lí',
                    // success: 'Lưu cảm nghĩ thành công !',
                    // error: 'Người dùng từ chối!',
                }
            )
            if (review !== "") {
                let formData = new FormData();
                for (let i = 0; i < selectedFiles.length; i++) {
                    formData.append('images', selectedFiles[i]);
                }
                formData.append("user", userinfor._id);
                formData.append("time", selectTrip.arrivalDate)
                formData.append("trHash", review)
                console.log(selectedFiles)
                await reviewtoBE(formData, userinfor.accessToken, axiosJWT)
                if (update) {
                    setUpdate(false)
                }
                else {
                    setUpdate(true)
                }
            }
            setSelectTrip("");
            setImgs([]);
            setRating(0);
            setDescription("");
            setTitle("");
            setSelectedFiles([])
            setOpen1(false);
        }
        setOpen2(false);
        return action;
    }

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
                                <div onClick={() => handleOpen1(item)} key={itemIndex}>
                                    <Trip trip={item}></Trip>
                                </div>
                            ))}
                        </div>}
                        {isLoading === true ? <div>
                            <div><Skeleton height="100%" /></div>
                            <div><Skeleton height="100%" /></div>
                        </div> : <div className="trips__results--2">
                            {row2 && row2.map((item, itemIndex) => (
                                <div onClick={() => handleOpen1(item)} key={itemIndex}>
                                    <Trip trip={item}></Trip>
                                </div>
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
                            <Pagination count={totalPages} onChange={handlePageChange} showFirstButton showLastButton color="primary" />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog
                        fullWidth={true}
                        maxWidth="xl"
                        open={open1}
                        onClose={handleClose1}
                        PaperComponent={PaperComponent}
                        aria-labelledby="draggable-dialog-title"
                        scroll='paper'
                    >
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                            NÊU CẢM NGHĨ VỀ CHUYẾN ĐI
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Thời gian: {convertTimestampToVietnamTime(Number(selectTrip?.arrivalDate))}
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
                                        disabled={selectTrip.isReview === true ? true : false}
                                        onChange={(event, value) => handleRatingChange(event, value)}></Rating>
                                    <div className="tripinfor-form">
                                        <TextField
                                            required
                                            id="standard-required"
                                            label="Tiêu đề"
                                            placeholder='Nhập tiêu đề'
                                            variant="standard"
                                            fullWidth
                                            value={title}
                                            onChange={event => handleTitleChange(event)}
                                            disabled={selectTrip.isReview === true ? true : false}
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
                                            value={description}
                                            onChange={event => handleDescriptionChange(event)}
                                            disabled={selectTrip.isReview === true ? true : false}
                                        />
                                    </div>
                                </Box>
                                <label className="upload-imgs">
                                    Tải ảnh lên
                                    <input className="input-upload-imgs" type="file" name="images" multiple onChange={handleFileChange} disabled={selectTrip?.isReview === true ? true : false} />
                                </label>
                                <div className="trip-img-wrapper">
                                    <Gallery>
                                        {
                                            selectedFiles && selectedFiles.map((item, index) => (
                                                <Item
                                                    original={window.URL.createObjectURL(item)}
                                                    thumbnail={window.URL.createObjectURL(item)}
                                                    width="1024"
                                                    height="768"
                                                    key={index}
                                                >
                                                    {({ ref, open }) => (
                                                        <img ref={ref} onClick={open} src={window.URL.createObjectURL(item)} alt="ảnh" />
                                                    )}
                                                </Item>
                                            ))
                                        }
                                        {
                                            imgs && imgs.map((item, index) => (
                                                <Item
                                                    original={item}
                                                    thumbnail={item}
                                                    width="1024"
                                                    height="768"
                                                    key={index}
                                                >
                                                    {({ ref, open }) => (
                                                        <img ref={ref} onClick={open} src={item} alt="ảnh" />
                                                    )}
                                                </Item>
                                            ))
                                        }
                                    </Gallery>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={(event) => handleClose1(event, 0)}>
                                Huỷ
                            </Button>
                            <Button onClick={(event) => handleClose1(event, 1)}>Lưu</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        fullWidth={true}
                        maxWidth="xs"
                        open={open2}
                        onClose={handleClose2}
                        PaperComponent={PaperComponent}
                        aria-labelledby="draggable-dialog-title"
                        scroll='paper'
                    >
                        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                            Kiểm tra lại thông tin kỹ lưỡng trước khi xác nhận
                        </DialogTitle>
                        <DialogContent>

                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={(event) => handleClose2(event, 0)}>
                                Huỷ
                            </Button>
                            <Button onClick={(event) => handleClose2(event, 1)}>Xác nhận</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container >
        </div >
    );
};

export default Trips;