import "./css/Trip.scss";
import { Typography, Card, CardMedia, CardContent } from '@mui/material';
import { Rating } from '@mui/material';
const Trip = (props) => {
    console.log(props)
    let trip = props.trip;
    console.log(trip.arrivalDate)
    const convertTimestampToVietnamTime = (timestamp) => {
        // Tạo đối tượng Date với timestamp
        const date = new Date(timestamp * 1000); // Đảo ngược timestamp về millisecond
    
        // Chuyển đổi thành ngày giờ Việt Nam
        const vietnamTime = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
    
        // Trả về chuỗi ngày giờ Việt Nam
        return vietnamTime.toString();
      };
    
    
    const getFirst40Characters = (obj) => {
        if (obj.hasOwnProperty("description")) {
            return obj.description.substring(0, 40);
        } else {
            return "";
        }
    }
    const handleTripClick = (trip) => {

    }
    return (
        <div className="trip-wrapper">
            <Card>
                <CardMedia
                    component="img"
                    alt={trip?.title}
                    height="140"
                    // image={trip?.images[0].url}
                    onClick={() => handleTripClick(trip)}
                    style={{ cursor: 'pointer' }}
                />
                <CardContent>
                    {trip.title? <Typography variant="h6">{trip.title}</Typography> :<Typography variant="h6">Title</Typography>}
                    <Typography variant="subtitle1">Thời gian: {convertTimestampToVietnamTime(Number(trip.arrivalDate))}</Typography>
                    <Typography variant="body1">{getFirst40Characters(trip)} <p className="trip__continue">Xem thêm</p></Typography>
                    <Rating value={Number(trip.rate)} readOnly />
                </CardContent>
            </Card>
        </div >
    );
}

export default Trip;