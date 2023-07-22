import { FaMapMarkerAlt, FaComments } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Rating } from "@mui/material";
import "./css/Place_Thumbnail.scss";
import { getReviewNumber } from "../dapp/getReviewNumber";
import { useEffect, useState } from "react";
import { getDestinationRates } from "../dapp/getDestinationRates";
import getReviewInPlace from "../dapp/getAllReviews";

const PlaceThumbnail = (props) => {
    let place = props.place;
    // console.log("place: ", place)
    const [reviewCount, setReviewCount] = useState(0);
    const [rates, setRates] = useState([]);
    const [reviews, setReviews] = useState([]);
    // const [average, setAverage] = useState(0);
    const navigate = useNavigate();
    const [average, setAverage] = useState(0);
    useEffect(() => {
        const getNumberRate = async (placeid) => {
            let number = await getReviewNumber(placeid);
            setReviewCount(Number(number));
            // console.log("number: ", number)
        }

        const getAllRates = async (placeid) => {
            let arrayRates = await getDestinationRates(placeid);
            console.log("arrayRates: ", arrayRates);
            setRates(arrayRates);
            await getAverage(arrayRates);
        }

        const getPlaceReview = async (placeid) => {
            let arrayJourney = await getReviewInPlace(placeid);
            console.log("arrayReviews: ", arrayJourney);
            setReviews(arrayJourney);
        }
        const getAverage = async (rates) => {
            let temp = 0;
            for (let i = 0; i < rates.length; i++) {
                temp += Number(rates[i]);
            }
            // console.log("trungbinh" ,average/rates.length); 
            // console.log(rates)
            temp = temp / rates.length;
            // setAverage(temp);
            console.log("average: ", temp)
            setAverage(temp);
            return temp;
        }
        getPlaceReview(place.placeid);
        getAllRates(place.placeid);
        getNumberRate(place.placeid);

    }, []);



    // useEffect(() => {
    //     // Gọi hàm tính trung bình và cập nhật state average khi rates thay đổi.
    //     const fetchDataRate = async () => {
    //         const averageValue = await getAverage(rates);
    //         setAverage(averageValue);
    //     }
    //     fetchDataRate();
    // }, [rates]); // Khi rates thay đổi, useEffect sẽ được gọi lại.

    const handleClick = () => {
        // Thêm một hàm lấy reviews

        //Sau đó tổng hợp data truyền cho placeinfor
        console.log({ state: { place, average, rates, reviewCount } })
        navigate('/placeinfor', { state: { place, average, rates, reviewCount } });
    };

    return (
        <div className="placethumbnail" onClick={handleClick}>
            <div className="placethumbnail__intro">
                <div className="placethumbnail__image">
                    <img src={place.thumbnail} alt="Ảnh"></img>
                </div>
                <div className="placethumbnail__rate">
                    <Rating name="size-large" value={average} precision={0.5} size="large" readOnly />
                </div>
                <div className="placethumbnail__title">
                    {place.name}
                </div>
                <div className="placethumbnail__content">
                    {place.intro}
                </div>
                <div className="placethumbnail__sth">
                    <div className="placethumbnail__sth--address">
                        <FaMapMarkerAlt className="place-icon"></FaMapMarkerAlt>
                        <div className="place-address">{place.address}</div>
                    </div>
                    <div className="placethumbnail__sth--comment">
                        <FaComments className="place-icon"></FaComments>
                        <div className="place-review">{reviewCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PlaceThumbnail;