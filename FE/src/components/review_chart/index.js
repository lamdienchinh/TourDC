import { LinearProgress, Rating } from "@mui/material";
import "./css/Review_Chart.scss";
// import { useEffect } from "react";
const ReviewChart = (props) => {
    let reviews = props.reviews;
    let oneStarCount = 0;
    let twoStarCount = 0;
    let threeStarCount = 0;
    let fourStarCount = 0;
    let fiveStarCount = 0;

    const countStar = () => {
        for (let i = 0; i < reviews.length; i++) {
            switch (Number(reviews[i])) {
                case 1: oneStarCount++;
                    break;
                case 2: twoStarCount++;
                    break;
                case 3: threeStarCount++;
                    break;
                case 4: fourStarCount++;
                    break;
                case 5: fiveStarCount++;
                    break;
                default:
                    break;
            }
        }
    }
    countStar();
    return (
        <div className="reviewchart">
            <div className="reviewchart__column1">
                <div className="reviewchart__total">
                    {Math.round(props.average + 0.5) - 0.5}
                </div>
                <div>
                    <Rating name="size-large" value={props.average} precision={0.5} size="large" readOnly />
                </div>
            </div>
            <div className="reviewchart__column2">
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        5
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={fiveStarCount} valueBuffer={100} variant="buffer" />
                    </div>
                </div>
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        4
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={fourStarCount} valueBuffer={100} variant="determinate" />
                    </div>
                </div>
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        3
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={threeStarCount} valueBuffer={100} variant="determinate" />
                    </div>
                </div>
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        2
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={twoStarCount} valueBuffer={100} variant="determinate" />
                    </div>
                </div>
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        1
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={oneStarCount} valueBuffer={100} variant="determinate" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewChart;