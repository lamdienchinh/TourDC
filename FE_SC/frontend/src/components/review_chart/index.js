import { LinearProgress, Rating } from "@mui/material";
import "./css/Review_Chart.scss";
const ReviewChart = (props) => {
    // let reviews = props.reviews;
    return (
        <div className="reviewchart">
            <div className="reviewchart__column1">
                <div className="reviewchart__total">
                    5
                </div>
                <div>
                    <Rating name="size-large" defaultValue={5} precision={0.5} size="large" readOnly />
                </div>
            </div>
            <div className="reviewchart__column2">
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        5
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={80} valueBuffer={100} variant="buffer" />
                    </div>
                </div>
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        4
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={80} valueBuffer={100} variant="determinate" />
                    </div>
                </div>
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        3
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={80} valueBuffer={100} variant="determinate" />
                    </div>
                </div>
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        2
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={80} valueBuffer={100} variant="determinate" />
                    </div>
                </div>
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        1
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={80} valueBuffer={100} variant="determinate" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewChart;