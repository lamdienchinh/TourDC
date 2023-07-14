import { FaMapMarkerAlt, FaComments } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Rating } from "@mui/material";
import "./css/Place_Thumbnail.scss";

const PlaceThumbnail = (props) => {
    let place = props.place;
    const navigate = useNavigate();
    const handleClick = () => {
        // Thêm một hàm lấy reviews
        
        //Sau đó tổng hợp data truyền cho placeinfor
        navigate('/placeinfor', { state: place });
    };
    return (
        <div className="placethumbnail" onClick={handleClick}>
            <div className="placethumbnail__intro">
                <div className="placethumbnail__img">
                    <img src={place.img} alt="Ảnh tạm"></img>
                </div>
                <div className="placethumbnail__rate">
                    <Rating name="size-large" defaultValue={place.rate} precision={0.5} size="large" readOnly />
                </div>
                <div className="placethumbnail__title">
                    {place.title}
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
                        <div>{place.comment}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PlaceThumbnail;