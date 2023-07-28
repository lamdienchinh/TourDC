// import SliderBanner from "../../components/slider_banner";
import PlaceThumbnail from "../../components/place_thumbnail";
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Pagination, NativeSelect, InputLabel, FormControl, TextField } from '@mui/material';
// import types from "../../constants";
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from "@mui/material/Typography";
import { getAllPlace, getAllReviewsInAllPlaces } from "../../service/api";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import { getUserData } from '../../state/selectors';
// import { useSelector } from 'react-redux';
//import scss
import "./css/Home.scss"


const Home = () => {
    // let walletAddress = useSelector(getUserData);
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    const [inputsearch, setInputSearch] = useState("");

    // Lấy các places từ BE
    const [allplaces, setAllPlaces] = useState([]);


    // Places sau khi filter rồi 
    const [places, setPlaces] = useState([]);

    const [select, setSelect] = useState(1);
    const [getplaces, setGetPlaces] = useState(0);
    const [row1, setRow1] = useState([]);
    const [row2, setRow2] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const handlePageChange = (event, number) => {
        setSelect(number);
    }

    useEffect(() => {
        const fetchdata = async () => {
            let fetch1 = await getAllPlace();
            console.log("Check1", fetch)
            let fetch2 = await getAllReviewsInAllPlaces();
            console.log("Check2 ", fetch2)
            const mergedArray = fetch1.map((item, index) => {
                return { ...item, reviews: fetch2[index] };
            });
            console.log("Merged Array", mergedArray)
            setAllPlaces(mergedArray);
            setPlaces(mergedArray);
            handleClose();
        }
        // let temp = types.types;
        // const array = Array.from({ length: 50 }, (_, index) =>
        //     temp[Math.floor(index / 10)]
        // ).flatMap((placeType, index) => ({
        //     ...placeType
        // }));

        fetchdata();
        // setAllPlaces(array);
        // setPlaces(array);
        console.log("allplace: ", allplaces)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const fetchData = async () => {
            const start = 4 * (select - 1);
            let end = start + 4;
            if (end > places.length) end = places.length;
            const temp = places.slice(start, end);

            const total = Math.ceil(places.length / 4);

            const row1 = temp.slice(0, 2);
            const row2 = temp.slice(2, 4);
            // const row3 = temp.slice(4, 6);
            // const row4 = temp.slice(6, 8);

            setRow1(row1);
            setRow2(row2);
            // setRow3(row3);
            // setRow4(row4);
            setTotalPages(total);
        };
        fetchData();
    }, [select, places]);
    const filter = (value) => {
        let currents = allplaces;
        if (getplaces !== value) {
            setGetPlaces(value);
            setSelect(1);
            switch (value) {
                case 1:
                    currents = allplaces.filter(item => item.type === 'danhlam')
                    setPlaces(currents);
                    break;
                case 2:
                    currents = allplaces.filter(item => item.type === 'amthuc')
                    setPlaces(currents);
                    break;
                case 3:
                    currents = allplaces.filter(item => item.type === 'giaitri')
                    setPlaces(currents);
                    break;
                case 4:
                    currents = allplaces.filter(item => item.type === 'noio')
                    setPlaces(currents);
                    break;
                default:
                    break;
            }
        }
        else {
            setGetPlaces(0);
            setSelect(1);
            setPlaces(allplaces);
        }
    }

    const search = () => {
        let data = allplaces;
        const filteredData = data.filter((item) => {
            // Chuyển đổi tiêu đề và địa chỉ thành chữ thường để tìm kiếm không phân biệt hoa thường
            const lowerCaseTitle = item.name.toLowerCase();
            const lowerCasePlace = item.address.toLowerCase();
            const lowerCaseKeyword = inputsearch.toLowerCase();

            // Sử dụng indexOf() để kiểm tra sự xuất hiện của từ khóa trong tiêu đề
            let index = lowerCaseTitle.indexOf(lowerCaseKeyword);
            let index2 = lowerCasePlace.indexOf(lowerCaseKeyword);
            return (index !== -1) || (index2 !== -1);
        });
        setPlaces(filteredData);
    };

    function sortArrayByReviews(type) {
        let arr = [...places];
        if (type === "1") {
            arr.sort(function (a, b) {
                return a.reviews.length - b.reviews.length;
            });
        } else if (type === "2") {
            arr.sort(function (a, b) {
                return b.reviews.length - a.reviews.length;
            });
        } else {
            console.log("Invalid sorting type");
        }
        setPlaces(arr);
    }

    function sortArrayByWord(type) {
        let arr = [...places];
        arr.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
        console.log(typeof (type))
        if (type === "2") {
            arr.reverse();
        }
        console.log(arr)
        setPlaces(arr);
    }

    return (
        <div className="home">
            <Backdrop
                sx={{ color: '#fffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="home__slides">
                <div className="home__slides__content">
                    Khám phá các địa điểm du lịch
                </div>
                <div className="home__slides_breadcumb">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Typography color="text.primary">Travel</Typography>
                    </Breadcrumbs>
                </div>
            </div>
            <Container maxWidth="lg">
                <div className="places-wrapper">
                    <div className="home__options">
                        <h1>Tìm kiếm địa điểm</h1>
                        <div className="home__slides--searchbar" >
                            <TextField
                                label="Tìm kiếm"
                                id="standard-size-normal"
                                variant="standard"
                                onChange={(event) => setInputSearch(event.target.value)}
                                placeholder="Tìm kiếm ở đây"
                            />
                            <FaSearch className="search-icon" onClick={() => search()}></FaSearch>
                        </div>
                        <h1>Loại địa điểm</h1>
                        <div className="type-wrapper">
                            <div className={`home-btn home__options--danhlam ${getplaces === 1 ? 'home__options--selected' : ''}`} onClick={() => filter(1)}>
                                Danh lam
                            </div>
                            <div className={`home-btn home__options--amthuc ${getplaces === 2 ? 'home__options--selected' : ''}`} onClick={() => filter(2)}>
                                Ẩm thực
                            </div>
                            <div className={`home-btn home__options--giaitri ${getplaces === 3 ? 'home__options--selected' : ''}`} onClick={() => filter(3)}>
                                Giải trí
                            </div>
                            <div className={`home-btn home__options--noio ${getplaces === 4 ? 'home__options--selected' : ''}`} onClick={() => filter(4)}>
                                Nơi ở
                            </div>
                        </div>
                        <h1>Sắp xếp</h1>
                        <FormControl fullWidth className="home-filter">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">Thứ tự tiêu đề </InputLabel>
                            <NativeSelect
                                defaultValue={1}
                                onChange={(event) => sortArrayByWord(event.target.value)}
                            >
                                <option value={1}>A-Z ASC</option>
                                <option value={2}>Z-A DASC</option>
                            </NativeSelect>
                        </FormControl>
                        <FormControl fullWidth className="home-filter">
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">Số Reviews</InputLabel>
                            <NativeSelect
                                defaultValue={1}
                                onChange={(event) => sortArrayByReviews(event.target.value)}
                            >
                                <option value={1}>Tăng dần</option>
                                <option value={2}>Giảm dần</option>
                            </NativeSelect>
                        </FormControl>
                    </div>
                    <div className="home__results">
                        {open === false &&
                            <div className="home__results--1">
                                {row1 && row1.map((item, itemIndex) => (
                                    <PlaceThumbnail key={itemIndex} place={item}></PlaceThumbnail>
                                ))}
                            </div>}
                        {open === false &&
                            <div className="home__results--2">
                                {row2 && row2.map((item, itemIndex) => (
                                    <PlaceThumbnail key={itemIndex} place={item}></PlaceThumbnail>
                                ))}
                            </div>}
                        {
                            places && places.length > 0 ? <div className="home__results--pagination">
                                <Pagination count={totalPages} onChange={handlePageChange} showFirstButton showLastButton color="primary" />
                            </div> : ""
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
}
export default Home;
