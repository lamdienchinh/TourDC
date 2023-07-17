// import { FaMapMarkerAlt, FaComments } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./css/Album_Thumbnail.scss"
const AlbumThumbnail = (props) => {
    let place = props.place;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/viewalbum');
    };
    let time = `${place.time.getDate()}/${place.time.getMonth()}/${place.time.getFullYear()}`
    return (
        <div className="albumthumbnail" onClick={handleClick}>
            <div className="albumthumbnail__img">
                <img src={place.img} alt="Ảnh tạm"></img>
            </div>
            <div className="albumthumbnail__intro">
                <div className="albumthumbnail__title">
                    {place.title}
                </div>
                <div className="albumthumbnail__time">
                    Thời gian: {time}
                </div>
            </div>
        </div>
    );
}
export default AlbumThumbnail;