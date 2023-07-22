import { FaMapMarkerAlt, FaComments } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Rating } from "@mui/material";
import "./css/Place_Thumbnail.scss";
import { useEffect, useState } from "react";

const PlaceThumbnail = (props) => {
    const [rates, setRates] = useState(props.place.reviews);
    const navigate = useNavigate();
    const [average, setAverage] = useState(0);

    useEffect(() => {
        const getAverage = async () => {
            let temp = 0;
            setRates(props.place.reviews)
            console.log("Rates", props.place.reviews)
            if (props.place.reviews.length > 0) {
                for (let i = 0; i < props.place.reviews.length; i++) {
                    temp += Number(props.place.reviews[i].rate);
                }
                temp = temp / props.place.reviews.length;
                temp = Math.round(temp * 2) / 2;
                console.log("average: ", temp)
                setAverage(temp);
            }
            else {
                console.log("average: ", temp)
                setAverage(0);
            }
            return temp;
        }
        getAverage()
    }, [props]);


    const handleClick = () => {
        navigate(`/placeinfor?placeid=${props.place.placeid}`)
    };

    return (
        <div className="placethumbnail" onClick={handleClick}>
            <div className="placethumbnail__intro">
                <div className="placethumbnail__image">
                    <img src={props.place.thumbnail} alt="Ảnh"></img>
                </div>
                <div className="placethumbnail__rate">
                    <Rating name="size-large" value={average} precision={0.5} size="large" readOnly />
                </div>
                <div className="placethumbnail__title">
                    {props.place.name}
                </div>
                <div className="placethumbnail__content">
                    {props.place.intro}
                </div>
                <div className="placethumbnail__sth">
                    <div className="placethumbnail__sth--address">
                        <FaMapMarkerAlt className="place-icon"></FaMapMarkerAlt>
                        <div className="place-address">{props.place.address}</div>
                    </div>
                    <div className="placethumbnail__sth--comment">
                        <FaComments className="place-icon"></FaComments>
                        <div className="place-review">{rates.length}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PlaceThumbnail;