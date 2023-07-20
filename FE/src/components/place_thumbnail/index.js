import { FaMapMarkerAlt, FaComments } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Rating } from "@mui/material";
import "./css/Place_Thumbnail.scss";
import { getReviewNumber } from "../dapp/getReviewNumber";
import { useEffect, useState } from "react";
import { getDestinationRates } from "../dapp/getDestinationRates";

const PlaceThumbnail = (props) => {
    let place = props.place;
    const [reviewCount, getReviewCount] = useState(0);
    const [rates, setRates] = useState([]);
    // const [average, setAverage] = useState(0);
    const navigate = useNavigate();
    const handleClick = () => {
        // Thêm một hàm lấy reviews
        
        //Sau đó tổng hợp data truyền cho placeinfor
        navigate('/placeinfor', { state: place });
    }; 
    useEffect(() => {
        const getNumberRate = async(placeid) => {
            let number = await getReviewNumber(placeid);
            getReviewCount(Number(number));
            // console.log("number: ", number)
        }

        const getAllRates = async(placeid) => {
            let arrayRates = await getDestinationRates(placeid);
            console.log("arrayRates: ", arrayRates);
            setRates(arrayRates);
        }

        
        getAllRates(place.placeid)
        getNumberRate(place.placeid);
    },[]);
    
    const getAverage = async(rates) => {
        let temp = 0;
        for(let i = 0; i < rates.length; i++) {
            temp += Number(rates[i]);
        }
        // console.log("trungbinh" ,average/rates.length); 
        // console.log(rates)
        temp = temp / rates.length;
        // setAverage(temp);
        console.log("average: ",temp)
        return temp;
    }
    const number =  async() => {
        return await getAverage(rates);
    } 
    
    return (
        <div className="placethumbnail" onClick={handleClick}>
            <div className="placethumbnail__intro">
                <div className="placethumbnail__img">
                    <img src={place.thumbnail} alt="Ảnh tạm"></img>
                </div>
                <div className="placethumbnail__rate">
                    <Rating name="size-large" defaultValue={number()} precision={0.5} size="large" readOnly />
                </div>
                <div className="placethumbnail__title">
                    {place.name}
                </div>
                <div className="placethumbnail__content">
                    {place.content}
                </div>
                <div className="placethumbnail__sth">
                    <div className="placethumbnail__sth--address">
                        <FaMapMarkerAlt></FaMapMarkerAlt>
                        <div>{place.address}</div>
                    </div>
                    <div className="placethumbnail__sth--comment">
                        <FaComments></FaComments>
                        <div>{reviewCount}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PlaceThumbnail;