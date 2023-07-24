// import { FaMapMarkerAlt, FaComments } from "react-icons/fa";
import "./css/Album_Thumbnail.scss"
import img from "../../assets/imgs/place2.jpg"
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
const AlbumThumbnail = (props) => {
    const album = props.album;
    console.log(album)
    useEffect(() => {

    })
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
        <Link to={`/viewalbum?id=${album._id}`} style={{ textDecoration: 'none' }}>
            <div className="albumthumbnail">
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
            </div >
        </Link >
    );
}
export default AlbumThumbnail;