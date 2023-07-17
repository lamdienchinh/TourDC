import React, { useEffect, useState } from 'react';
import { Rating, Typography, ImageList, ImageListItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from "@mui/material";
import { NativeSelect, InputLabel, FormControl, TextField } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import "./css/CreateAlbum.scss"
import Container from '@mui/material/Container';
import Draggable from 'react-draggable';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
// import axios from 'axios';
import img from "../../assets/imgs/place1.png"

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

const CreateAlbum = () => {
    const [trips] = useState([
        { id: 1, title: 'Trip 1', selected: false, time: '2023-07-01', rating: 0, images: [] },
        { id: 2, title: 'Trip 2', selected: false, time: '2023-07-02', rating: 0, images: [] },
        { id: 3, title: 'Trip 3', selected: false, time: '2023-07-03', rating: 0, images: [] },
        { id: 4, title: 'Trip 4', selected: false, time: '2023-07-04', rating: 0, images: [] },
        { id: 5, title: 'Trip 5', selected: false, time: '2023-07-05', rating: 0, images: [] },
        { id: 6, title: 'Trip 6', selected: false, time: '2023-07-06', rating: 0, images: [] },
    ]);

    const [selectedTrips, setSelectedTrips] = useState([]);
    const [imgs] = useState([img, img, img, img]);

    useEffect(() => {
        console.log('New', selectedTrips);
    }, [selectedTrips])

    const handleAdd = async (event, id) => {

        let trip = trips.find(item => item.id === id);
        let newselectedtrips = [...selectedTrips];
        let check = newselectedtrips.find(item => item.id === id);
        if (check) toast.error("Bạn đã thêm chuyến đi này vào album rồi")
        else {
            newselectedtrips.push(trip);
            toast.success("Thêm chuyến đi vào album thành công")
            setSelectedTrips(newselectedtrips);
        }
    }
    const handleRemove = async (event, id) => {
        setRemoveTrip(id);
    }
    const [removetrip, setRemoveTrip] = useState("");

    const handleClose = (event, check) => {
        if (check) {
            let newselectedtrips = [...selectedTrips];
            newselectedtrips = newselectedtrips.filter(item => item.id !== removetrip);
            toast.success("Xoá chuyến đi này khỏi album thành công")
            setSelectedTrips(newselectedtrips);
        }
        setRemoveTrip(false);
    };

    const handleCreateAlbum = async (event) => {
        event.preventDefault();
        console.log(selectedTrips)
        toast.success('Tạo album mới thành công !')
    };

    return (
        <div className="createalbum">
            <div className="createalbum-slide">
                Tạo Album của riêng bạn
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/album">
                        Album
                    </Link>
                    <Typography color="text.primary">Create Album</Typography>
                </Breadcrumbs>
            </div>
            <Container maxWidth="lg">
                <h1>Tìm kiếm</h1>
                <div className="createalbum__utils">
                    <div className="createalbum__search" >
                        <TextField
                            label="Tìm kiếm"
                            id="standard-size-normal"
                            variant="standard"
                            // onChange={(event) => setInputSearch(event.target.value)}
                            placeholder="Tìm kiếm ở đây"
                        />
                        {/* <FaSearch className="search-icon" onClick={() => search(inputsearch)}></FaSearch> */}
                        <div className="createalbum__search__btn">
                            <FaSearch className="search-icon"></FaSearch>
                        </div>
                    </div>
                    <h1>Sắp xếp</h1>
                    <div className="createalbum__sort">
                        <FormControl fullWidth className="home-filter">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">Ngày đi</InputLabel>
                            <NativeSelect
                                defaultValue={1}
                            // onChange={handleChange}
                            >
                                <option value={1}>Gần đây nhất</option>
                                <option value={2}>Lâu nhất</option>
                            </NativeSelect>
                        </FormControl>
                        <FormControl fullWidth className="home-filter">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">Chữ cái</InputLabel>
                            <NativeSelect
                                defaultValue={1}
                            // onChange={handleChange}
                            >
                                <option value={1}>Tăng dần</option>
                                <option value={2}>Giảm dần</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                </div>
                <div className="createalbum__contents">
                    <div className="createalbum__left">
                        <h2>Create Album</h2>
                        <div className="trips-list">
                            {trips && trips.map((currentTrip) => (
                                <div className="trip-box">
                                    {
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography sx={{ width: '33%', flexShrink: 0 }}> {currentTrip.title}</Typography>
                                                <Typography sx={{ color: 'text.secondary' }}>Thời gian: {currentTrip.time}, Địa điểm: </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="trip__infor">
                                                    <div className='rating__row'>
                                                        Rating:
                                                        <Rating
                                                            name="rating"
                                                            value={currentTrip.rating}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component="h6">
                                                            {currentTrip?.description ? currentTrip.description : "Chưa có cảm nghĩ"}
                                                        </Typography>
                                                    </div>
                                                    <div>
                                                        Ảnh đã đăng tải:
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
                                                    </div>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    }
                                    <Button className={`trip-select-btn`} onClick={(event) => handleAdd(event, currentTrip.id)} variant="outlined">
                                        Thêm
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="createalbum__right">
                        <Typography variant="h4">Tạo Album</Typography>
                        <Button className="createalbum-btn" onClick={(event) => handleCreateAlbum(event)} variant="outlined">Tạo Album</Button>
                        <Typography variant="h5">Trips đã chọn </Typography>
                        <div className="selected-trips">
                            {selectedTrips && selectedTrips.map((trip) => (
                                <div className="selected-trip">
                                    <div key={trip.title}>{trip.title}</div>
                                    <Button className={`trip-remove-btn`} onClick={(event) => handleRemove(event, trip.id)} variant="outlined">
                                        Xoá
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Dialog
                    open={removetrip}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    disableScrollLock={true}
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Thêm chuyến đi
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn có muốn thêm chuyến đi này không
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={(event) => handleClose(event, 0)}>
                            Huỷ
                        </Button>
                        <Button onClick={(event) => handleClose(event, 1)}>
                            Xác nhận
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container >
        </div >
    );
};

export default CreateAlbum;