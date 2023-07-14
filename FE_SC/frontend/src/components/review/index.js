import img from "../../assets/imgs/slider_banner_1.png";
import { Rating } from "@mui/material";
import img1 from "../../assets/imgs/angiang.webp"
import { ImageList, ImageListItem, Paper } from "@mui/material";
import "./css/Review.scss";

const Review = () => {
    let listimg = [img1, img1, img1, img1];
    return (
        <div className="review">
            <div className="review__row1">
                <div className="review__column1">
                    <div className="review__owner">
                        <div>
                            <img src={img} alt="Ảnh avatar"></img>
                        </div>
                        <div className="review__name">
                            Lâm Điền Chinh
                        </div>
                    </div>
                    <div className="review__verify">
                        Xác thực
                    </div>
                    <div className="review__time">
                        5:32 PM dd/mm/yyyy
                    </div>
                </div>
                <div className="review__column2">
                    <Rating name="size-large" defaultValue={5} precision={0.5} size="large" readOnly />
                </div>
            </div>
            <div className="review__row2">
                <div className="review__title">
                    Cảm nghĩ về Rừng Tràm Trà Sư
                </div>
                <div className="review__content">
                    Cảnh ở đây thơ mộng, và rất đẹp !
                </div>
                <div className="review__listimgs">
                    <ImageList cols={4}>
                        {listimg && listimg.map((image, index) => (
                            <ImageListItem key={index}>
                                <Paper>
                                    <img
                                        src={image}
                                        alt={`Ảnh ${index}`}
                                        style={{ width: '100%' }}
                                    />
                                </Paper>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>
        </div>
    );
}
export default Review;