import "./css/Trip.scss";
import { Typography, Card, CardMedia, CardContent } from '@mui/material';
import { Rating } from '@mui/material';
const Trip = (props) => {
    let trip = props.trip;
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
                    alt={trip.title}
                    height="140"
                    image={trip.images[0].url}
                    onClick={() => handleTripClick(trip)}
                    style={{ cursor: 'pointer' }}
                />
                <CardContent>
                    <Typography variant="h6">{trip.title}</Typography>
                    <Typography variant="subtitle1">Thời gian: {trip.time}</Typography>
                    <Typography variant="body1">{getFirst40Characters(trip)} <p className="trip__continue">Xem thêm</p></Typography>
                    <Rating value={trip.rating} readOnly />
                </CardContent>
            </Card>
        </div >
    );
}

export default Trip;