import React, { useState, useEffect } from 'react';
import { Pagination, NativeSelect, InputLabel, FormControl } from '@mui/material';
import AlbumThumbnail from "../../components/album_thumbnail";
import img from "../../assets/imgs/slider_banner_1.png";
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
import Skeleton from '@mui/material/Skeleton';

const Album = () => {
    const [allalbums, setAllAlbums] = useState([])
    const [albums, setAlbums] = useState([]);
    const [newAlbum, setNewAlbum] = useState('');
    const [row1, setRow1] = useState([]);
    const [row2, setRow2] = useState([]);
    // const [row3, setRow3] = useState([]);
    // const [row4, setRow4] = useState([]);
    const [select, setSelect] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const [value, setValue] = useState(dayjs('2022-04-17T15:30'));
    const [isLoading, setIsLoading] = useState(true);

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
        let temp = {
            title: "TITLE",
            img: img,
            rate: 5,
            address: "ADDRESS",
            comment: "COMMENT",
            time: new Date(2023, 7, 13)
        }
        let array = Array.from({ length: 32 }, () => ({ ...temp }));
        setAlbums(array);
        setAllAlbums(array)
        setIsLoading(false)
    }, []);

    useEffect(() => {
        let start = 12 * (select - 1);
        let end = start + 12;
        if (end > albums.length) end = albums.length;
        let currents = albums.slice(start, end);
        let totalPages = Math.ceil(albums.length / 12);
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
        setValue(value);
        let arr = [...albums]
        arr.sort(function (a, b) {
            var dateA = new Date(a.dateCreated).getTime();
            var dateB = new Date(b.dateCreated).getTime();

            return dateA - dateB;
        });

        if (value === "2") {
            arr.reverse();
        }

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
        let arr = [...allalbums]
        let filteredArray = arr.filter(function (item) {
            // var itemDate = new Date(item);
            return (
                item.time.getDate() === date.getDate() &&
                item.time.getMonth() - 1 === date.getMonth() &&
                item.time.getFullYear() === date.getFullYear()
            );
        });

        setAlbums(filteredArray);
    }
    return (
        <div className="album">
            <div className="album-slide">
                Tạo Album, Chia sẻ khoảnh khắc
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
                                        onChange={(event) => filterDate(event.$d)}
                                        views={['year', 'month', 'day']}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="album__col col2">
                        <div className="album__results">
                            {
                                isLoading === true ? <div>
                                    <div><Skeleton height="100%" /></div>
                                    <div><Skeleton height="100%" /></div>
                                </div> : <div className="album__results--1">
                                    {row1 && row1.map((item, itemIndex) => (
                                        <AlbumThumbnail key={itemIndex} place={item} />
                                    ))}
                                </div>
                            }
                            {
                                isLoading === true ? <div>
                                    <div><Skeleton height="100%" /></div>
                                    <div><Skeleton height="100%" /></div>
                                </div> : <div className="album__results--2">
                                    {row2 && row2.map((item, itemIndex) => (
                                        <AlbumThumbnail key={itemIndex} place={item} />
                                    ))}
                                </div>
                            }
                            <div className="album__results--pagination">
                                <Pagination count={totalPages} onChange={handlePageChange} showFirstButton showLastButton />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Album;
