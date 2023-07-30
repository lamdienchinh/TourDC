import React, { useState, useEffect } from 'react';
import { Pagination, NativeSelect, InputLabel, FormControl } from '@mui/material';
import AlbumThumbnail from "../../components/album_thumbnail";
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import './css/Album.scss';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { getAlbums } from '../../service/api';
import { createAxios } from "../../utils/createInstance";
import { setInfor } from "../../state/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { getInfor } from '../../state/selectors';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Album = () => {
    const [isLoading, setIsLoading] = useState(true);
    const handleClose = () => {
        setIsLoading(false);
    };
    const [allalbums, setAllAlbums] = useState([])
    const [albums, setAlbums] = useState([]);
    const [newAlbum, setNewAlbum] = useState('');
    const [row1, setRow1] = useState([]);
    const [row2, setRow2] = useState([]);
    let user = useSelector(getInfor)
    const dispatch = useDispatch()
    const [select, setSelect] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const [value, setValue] = useState(dayjs('2022-04-17T15:30'));
    let axiosJWT = createAxios(user, dispatch, setInfor);
    const handleAddAlbum = () => {
        navigate("/createalbum");
        if (newAlbum) {
            setAlbums([...albums, newAlbum]);
            setNewAlbum('');
        }
    };
    const handleTrip = () => {
        navigate("/trips");
    };

    const handlePageChange = (event, number) => {
        setSelect(number);
    }

    useEffect(() => {
        let fetchdata = async () => {
            let token = user.accessToken;
            let result = await getAlbums(token, axiosJWT);
            console.log(result);
            setAlbums(result.data);
            setAllAlbums(result.data)
            setIsLoading(false)
        }
        fetchdata();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let start = 4 * (select - 1);
        let end = start + 4;
        if (end > albums.length) end = albums.length;
        let currents = albums.slice(start, end);
        let totalPages = Math.ceil(albums.length / 4);
        let row1 = currents.slice(0, 2);
        let row2 = currents.slice(2, 4);
        setRow1(row1);
        setRow2(row2);
        setTotalPages(totalPages);
    }, [albums, select]);

    useEffect(() => {
        console.log(isLoading)
    }, [isLoading])

    function sortArrayByDate(value) {
        let arr = [...albums];

        if (value === "1") {
            // Sắp xếp cũ đến mới
            arr.sort((a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf());
        } else if (value === "2") {
            // Sắp xếp mới đến cũ
            arr.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
        }

        // Cập nhật mảng albums đã sắp xếp vào state
        setAlbums(arr);
    }

    function sortArrayByWord(type) {
        let arr = [...albums];
        arr.sort(function (a, b) {
            return a.title.localeCompare(b.title);
        });
        console.log(typeof (type))
        if (type === "2") {
            console.log("Run")
            arr.reverse();
            console.log("Run")
        }
        console.log(arr)
        setAlbums(arr);
    }

    function filterDate(date) {
        if (!date) {
            // Nếu date không tồn tại (undefined hoặc null), hiển thị tất cả các albums
            setAlbums(allalbums);
            return;
        }

        // Lấy thông tin ngày, tháng và năm từ date
        const selectedDay = date.day();
        const selectedMonth = date.month() + 1; // Month trong Dayjs bắt đầu từ 0 nên cần cộng thêm 1
        const selectedYear = date.year();

        // Lọc các albums có trường createdAt tương ứng với ngày đã chọn
        const filteredArray = allalbums.filter((item) => {
            const itemDate = dayjs(item.createdAt);
            return (
                itemDate.day() === selectedDay &&
                itemDate.month() + 1 === selectedMonth &&
                itemDate.year() === selectedYear
            );
        });

        setAlbums(filteredArray);
    }
    return (
        <div className="album">
            <Backdrop
                sx={{ color: '#fffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="album-slide">
                <div className="album__slides__content">
                    Tạo Album, Chia sẻ khoảnh khắc
                </div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Typography color="text.primary">Album</Typography>
                </Breadcrumbs>
            </div>
            <Container maxWidth="lg">
                <div className="album-wrapper">
                    <div className="album__col col1">
                        <h1>Thêm Album & Xem các chuyến đi</h1>
                        <div className="album__button__list">
                            <button className="album__button" onClick={handleAddAlbum}>
                                Thêm Album
                            </button>
                            <button className="album__button" onClick={handleTrip}>
                                Xem Trips
                            </button>
                        </div>
                        <h1>Sắp xếp</h1>
                        <FormControl fullWidth className="album-filter">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">Tên tiêu đề</InputLabel>
                            <NativeSelect
                                defaultValue={1}
                                onChange={(event) => sortArrayByWord(event.target.value)}
                            >
                                <option value={1}>A-Z ASC</option>
                                <option value={2}>Z-A DASC</option>
                            </NativeSelect>
                        </FormControl>
                        <FormControl fullWidth className="album-filter">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">Ngày tạo</InputLabel>
                            <NativeSelect
                                defaultValue={1}
                                onChange={(event) => sortArrayByDate(event.target.value)}
                            >
                                <option value={1}>Cũ nhất</option>
                                <option value={2}>Mới nhất</option>
                            </NativeSelect>
                        </FormControl>
                        <h1>Chọn ngày tạo</h1>
                        <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']}>
                                    <DateTimePicker
                                        label="Chọn ngày"
                                        value={value}
                                        onChange={(event) => filterDate(dayjs(event.$d))}
                                        views={['year', 'month', 'day']}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="album__col col2">
                        <div className="album__results">
                            {
                                isLoading === false && row1.length > 0 ? < div className="album__results--1">
                                    {row1 && row1.map((item, itemIndex) => (
                                        <div className="album__items" key={itemIndex}>
                                            <AlbumThumbnail album={item} />
                                        </div>
                                    ))}
                                </div> : ""
                            }
                            {
                                isLoading === false && row2.length > 0 ? <div className="album__results--2">
                                    {row2 && row2.map((item, itemIndex) => (
                                        <div className="album__items" key={itemIndex}>
                                            <AlbumThumbnail album={item} />
                                        </div>
                                    ))}
                                </div> : ""
                            }
                            {
                                isLoading === false && row1.length > 0 ? <div className="album__results--pagination">
                                    <Pagination count={totalPages} onChange={handlePageChange} showFirstButton showLastButton color="primary" />
                                </div> : ""
                            }
                        </div>
                    </div>
                </div>
            </Container >
        </div >
    );
};

export default Album;
