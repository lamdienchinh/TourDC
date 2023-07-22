import { LinearProgress, Rating } from "@mui/material";
import "./css/Review_Chart.scss";
import { useEffect, useState } from "react";
// import { useEffect } from "react";
const ReviewChart = (props) => {
    let reviews = props.reviews;
    console.log(props.reviews)

    const [ratingCounts, setRatingCounts] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    const [ratingPercent, setRatingPercent] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
    useEffect(() => {
        setRatingCounts({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
        setRatingPercent({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 })
        let temp = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        let totalRatings = 0;
        props.reviews.forEach((item) => {
            const rate = Number(item.rate); // Chuyển BigInt sang number
            if (rate >= 1 && rate <= 5) {
                temp[rate]++;
                totalRatings++;
            }
        });
        setRatingCounts(temp)
        console.log(temp)
        const ratingPercentages = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        if (totalRatings > 0) {
            for (let i = 1; i <= 5; i++) {
                const percentage = (temp[i] / totalRatings) * 100;
                ratingPercentages[i] = percentage.toFixed(2); // Làm tròn đến 2 chữ số thập phân
            }
            console.log(ratingPercentages);
            setRatingPercent(ratingPercentages)
        }
    }, [props])
    return (
        <div className="reviewchart">
            <div className="reviewchart__column1">
                <div className="reviewchart__total">
                    {props.average}
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
                        <LinearProgress value={ratingPercent[5]} valueBuffer={100} variant="buffer" />
                    </div>
                    <div className="reviewchart__row--3">
                        {ratingCounts[5]}
                    </div>
                </div>
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        4
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={ratingPercent[4]} valueBuffer={100} variant="determinate" />
                    </div>
                    <div className="reviewchart__row--3">
                        {ratingCounts[4]}
                    </div>
                </div>
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        3
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={ratingPercent[3]} valueBuffer={100} variant="determinate" />
                    </div>
                    <div className="reviewchart__row--3">
                        {ratingCounts[3]}
                    </div>
                </div>
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        2
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={ratingPercent[2]} valueBuffer={100} variant="determinate" />
                    </div>
                    <div className="reviewchart__row--3">
                        {ratingCounts[2]}
                    </div>
                </div>
                <div className="reviewchart__row">
                    <div className="reviewchart__row--1">
                        1
                    </div>
                    <div className="reviewchart__row--2">
                        <LinearProgress value={ratingPercent[1]} valueBuffer={100} variant="determinate" />
                    </div>
                    <div className="reviewchart__row--3">
                        {ratingCounts[1]}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewChart;