import img from "../../assets/imgs/slider_banner_1.png";
import { Rating } from "@mui/material";
import img1 from "../../assets/imgs/angiang.webp"
import { ImageList, ImageListItem, Paper } from "@mui/material";
import "./css/Review.scss";
import { Gallery, Item } from 'react-photoswipe-gallery'

const Review = (props) => {
    // let listimg = [img1, img1, img1, img1];
    console.log(props.review.user)
    const user = props.review.user;
    const intValue = Number(props.review.time);

    // Tạo đối tượng Date từ số giây (intValue) để lấy ngày/tháng/năm và giờ/phút/giây
    const date = new Date(intValue * 1000); // *1000 để chuyển từ giây sang mili giây

    // Lấy thông tin ngày/tháng/năm
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0 (0 - 11) nên cần cộng thêm 1
    const year = date.getFullYear();

    // Lấy thông tin giờ/phút/giây
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return (
        <div className="review">
            <div className="review__row1">
                <div className="review__column1">
                    <div className="review__owner">
                        <div>
                            <img src={user?.avatar} alt="Ảnh avatar"></img>
                        </div>
                        <div className="review__name">
                            {`${user?.firstName} ${user?.lastname}`}
                        </div>
                    </div>
                    <div className="review__verify">
                        <a href={`https://sepolia.etherscan.io/tx/${props.review.trHash}`} target="_blank">Xác thực</a>
                    </div>
                    <div className="review__time">
                        {`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`}
                    </div>
                </div>
                <div className="review__column2">
                    <Rating name="size-large" defaultValue={Number(props.review.rate)} precision={0.5} size="large" readOnly />
                </div>
            </div>
            <div className="review__row2">
                <div className="review__title">
                    {props.review.title}
                </div>
                <div className="review__content">
                    {props.review.review}
                </div>
                <div className="review__listimgs">
                    {/* <ImageList cols={4}>
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
                    </ImageList> */}
                    <div className="review-img-wrapper">
                        <Gallery>
                            {
                                props.review?.list_imgs && props.review.list_imgs.map((item, index) => (
                                    <div>
                                        <Item
                                            original={item}
                                            thumbnail={item}
                                            width="1024"
                                            height="768"
                                            key={index}
                                        >
                                            {({ ref, open }) => (
                                                <img ref={ref} onClick={open} src={item} alt="ảnh" />
                                            )}
                                        </Item>
                                    </div>
                                ))
                            }
                        </Gallery>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Review;