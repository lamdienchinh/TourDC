// import { FaMapMarkerAlt, FaComments } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./css/Album_Thumbnail.scss"
import img from "../../assets/imgs/place2.jpg"
import { getReviewsWithIds } from "../../service/api"
import { useSelector } from 'react-redux';
import { getUserData } from '../../state/selectors';
const AlbumThumbnail = (props) => {
    let album = props.album;
    console.log(album)
    const navigate = useNavigate();
    const walletAddress = useSelector(getUserData);
    const handleClick = async () => {
        let tripsid = album.list_trips.map((item) => item.tripid);
        console.log(tripsid);
        let trips = await getReviewsWithIds(tripsid, walletAddress);
        console.log(trips)
        console.log(album)
        const mergedTrips = album.list_trips.map((trip, index) => ({
            ...trip,
            ...trips[index]
        }));
        let result = {
            ...album,
            list_trips: mergedTrips,
        }
        console.log(result)
        navigate('/viewalbum', { state: result });
    };
    let checkimg = img;
    try {
        if (album.list_trips.list_imgs) {
            checkimg = album.list_trips.list_imgs[0]
        }
    }
    catch (err) {
        console.log(err)
    }
    let dateObj = new Date(album.createdAt);
    dateObj = dateObj.toLocaleString();

    return (
        <div className="albumthumbnail" onClick={handleClick}>
            <div className="albumthumbnail__img">
                <img src={checkimg} alt="Ảnh tạm"></img>
            </div>
            <div className="albumthumbnail__intro">
                <div className="albumthumbnail__title">
                    {album.title}
                </div>
                <div className="albumthumbnail__time">
                    Thời gian: {dateObj}
                </div>
            </div>
        </div>
    );
}
export default AlbumThumbnail;