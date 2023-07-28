import "./css/Trip.scss";
import { Typography } from '@mui/material';
import { Rating } from '@mui/material';
import img from "../../assets/imgs/trip_default.jpg"
import place from "../../constants"
const Trip = (props) => {
    // console.log(props)
    let trip = props.trip;
    // console.log(trip)
    console.log(place)
    console.log(trip)
    const convertTimestampToVietnamTime = (timestamp) => {
        // Tạo đối tượng Date với timestamp
        const date = new Date(timestamp * 1000); // Đảo ngược timestamp về millisecond

        // Chuyển đổi thành ngày giờ Việt Nam
        const vietnamTime = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));

        // Trả về chuỗi ngày giờ Việt Nam
        return vietnamTime.toString();
    };

    const getFirst40Characters = (obj) => {
        if (obj.hasOwnProperty("review")) {
            return obj.review.substring(0, 40);
        } else {
            return "";
        }
    }
    return (
        <div className="tripinfor-wrapper">
            <div className="trip__img">
                <img src={trip.list_imgs ? trip.list_imgs[0] : img} alt="Ảnh Chuyến Đi"></img>
            </div>
            <div className="trip__information">
                {trip.title ? <Typography variant="h6">{trip.title}</Typography> : <Typography variant="h6">Chưa có cảm nghĩ</Typography>}
                <Typography variant="h7">{place.placenames[Number(trip.placeId) - 1]}</Typography>
                <Typography variant="subtitle1">Thời gian: {convertTimestampToVietnamTime(Number(trip?.arrivalDate))}</Typography>
                <Typography variant="body1">{(getFirst40Characters(trip))}<div className="trip__continue">xem thêm</div></Typography>
                <Rating value={Number(trip.rate)} readOnly />
            </div>
        </div >
    );
}

export default Trip;