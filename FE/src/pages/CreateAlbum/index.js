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
// import img from "../../assets/imgs/place1.png"
import { getAllTrips } from '../../components/dapp/getAllTrips';
import { useSelector, useDispatch } from 'react-redux'
import { getUserData, getInfor } from '../../state/selectors';
import { setInfor } from "../../state/userSlice";
import { createAxios } from "../../utils/createInstance";
import { getTrips } from '../../service/api';
import { convertTimestampToVietnamTime } from '../../components/dapp/convertTime';
import { Gallery, Item } from "react-photoswipe-gallery"

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

    const [allTrips, setAllTrips] = useState([]);
    const [currentAccount, setCurrentAccount] = useState(useSelector(getUserData));
    const dispatch = useDispatch();
    const user = useSelector(getInfor)
    const [userinfor, getUserInfor] = useState(useSelector(getInfor))
    const [imgs, setImgs] = useState([]);
    let axiosJWT = createAxios(user, dispatch, setInfor);
    const [update, setUpdate] = useState(true)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    useEffect(() => {
        const fetchData = async (currentAccount) => {

            // Thực hiện các bước để lấy dữ liệu infor
            const infor = await getAllTrips(currentAccount);
            console.log("infor:", infor)
            let temp = await getTrips(userinfor.accessToken, axiosJWT)
            console.log("Get Trip from BE", temp.data)
            temp = temp.data
            const mergedArray = infor.map((item1) => {
                const matchingElement = temp.find((item2) => item2.tripid === (item1.tripId).toString());
                if (matchingElement) {
                    return { ...item1, ...matchingElement };
                } else {
                    return item1;
                }
            });
            console.log("Merge Array", mergedArray)
            // setJourneys(mergedArray)
            setAllTrips(mergedArray)
            // setImgs(mergedArray.list_imgs)
            // console.log("imgs:", mergedArray.list_imgs)
        }
        fetchData(currentAccount);
    }, [update]);

    const [selectedTrips, setSelectedTrips] = useState([]);


    useEffect(() => {
        console.log('New', selectedTrips);
    }, [selectedTrips])

    const handleAdd = async (event, id) => {
        event.stopPropagation();
        let trip = allTrips.find(item => item.tripId === id);
        let newselectedtrips = [...selectedTrips];
        let check = newselectedtrips.find(item => item.tripId === id);
        console.log("ID", id)
        console.log("AllTrips", allTrips)
        if (check) toast.error("Bạn đã thêm chuyến đi này vào album rồi")
        else {
            newselectedtrips.push(trip);
            toast.success("Thêm chuyến đi vào album thành công")
            setSelectedTrips(newselectedtrips);
        }
    }
    const handleRemove = async (event, id) => {
        console.log(id);
        setRemoveTrip(id);
    }
    const [removetrip, setRemoveTrip] = useState("");

    const handleClose = (event, check) => {
        if (check) {
            let newselectedtrips = [...selectedTrips];
            newselectedtrips = newselectedtrips.filter(item => item.tripId !== removetrip);
            toast.success("Xoá chuyến đi này khỏi album thành công")
            setSelectedTrips(newselectedtrips);
        }
        setRemoveTrip(false);
    };

    const handleCreateAlbum = async (event) => {
        event.preventDefault();
        console.log(selectedTrips)
        const filteredData = selectedTrips.map(({ _id }) => ({
            _id,
        }));
        let newAlbum = {
            list_trips: filteredData,
            title: title,
            content: content,
        }
        console.log("NewAlbum", newAlbum);
        let token = user.accessToken;
        const create = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/album/`,
            newAlbum, {
            headers: {
                token: `Bearer ${token}`,
            },
        }
        )
        console.log(create.data);
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
                            fullWidth
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
                        <div className="album__input">
                            <TextField
                                label="Tiêu đề"
                                id="standard-size-normal"
                                variant="standard"
                                onChange={(event) => setTitle(event.target.value)}
                                placeholder="Tìm kiếm ở đây"
                                fullWidth
                            />
                        </div>
                        <div className="album__input">
                            <TextField
                                label="Nội dung"
                                id="standard-size-normal"
                                variant="standard"
                                multiline
                                minRows={5}
                                onChange={(event) => setContent(event.target.value)}
                                placeholder="Tìm kiếm ở đây"
                                fullWidth
                            />
                        </div>
                        <div className="trips-list">
                            {allTrips && allTrips.map((currentTrip) => (
                                <div className="trip-box">
                                    {
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={
                                                    <ExpandMoreIcon
                                                        sx={{
                                                            pointerEvents: "auto"
                                                        }}
                                                    />
                                                }
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                                sx={{
                                                    pointerEvents: "none"
                                                }}
                                            >
                                                <Typography sx={{ width: '33%', flexShrink: 0 }}>{currentTrip.title ? currentTrip.title : "Không có tiêu đề"}</Typography>
                                                <Typography sx={{ width: '53%', color: 'text.secondary' }}>Thời gian: {convertTimestampToVietnamTime(Number(currentTrip.arrivalDate))}, Địa điểm: </Typography>
                                                <Button sx={{ width: '13%', flexShrink: 0, pointerEvents: "auto" }} className={`trip-select-btn`} onClick={(event) => handleAdd(event, currentTrip.tripId)} variant="outlined">
                                                    Thêm
                                                </Button>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="trip__infor">
                                                    <div className='rating__row'>
                                                        Rating:
                                                        <Rating
                                                            name="rating"
                                                            value={Number(currentTrip.rate)}
                                                            readOnly
                                                        />
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component="h6">
                                                            {currentTrip?.review ? currentTrip.review : "Chưa có cảm nghĩ"}
                                                        </Typography>
                                                    </div>
                                                    <div>Ảnh đã đăng tải:</div>
                                                    <div className="createalbum-img-wrapper">
                                                        <Gallery>
                                                            {
                                                                currentTrip.list_imgs && currentTrip.list_imgs.map((item, index) => (
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
                                            </AccordionDetails>
                                        </Accordion>
                                    }
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
                                    <Button className={`trip-remove-btn`} onClick={(event) => handleRemove(event, trip.tripId)} variant="outlined">
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