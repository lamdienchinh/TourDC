import { Rating } from "@mui/material";
import "./css/Review.scss";
import { Gallery, Item } from 'react-photoswipe-gallery'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useSelector } from 'react-redux';
import { getInfor, getUserData } from '../../state/selectors';
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import { createAxios } from '../../utils/createInstance';
import { setInfor } from '../../state/userSlice';
import { useDispatch } from 'react-redux';
import { getTrustRate } from "../../service/api";

const Review = (props) => {
    // let listimg = [img1, img1, img1, img1];
    const walletAddress = useSelector(getUserData)
    console.log(props.review.user)
    const user = props.review.user;
    const intValue = Number(props.review.time);
    const currentuser = useSelector(getInfor)
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentuser, dispatch, setInfor);
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
    const [reaction, setReaction] = useState("")
    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    const [trustrate, setTrustRate] = useState(0)
    const [allReviews, setAllReviews] = useState([])
    const [rate, setRate] = useState(Number(props.review.rate))
    const handleReaction = async (action) => {
        if (walletAddress === "") {
            toast.error("Bạn chưa đăng nhập")
        }
        else {
            console.log("Current", currentuser)
            console.log("All Reviews", allReviews)
            let find = allReviews.filter(item => item.user._id === currentuser._id);
            if (find.length > 0) {
                if (action === "dislike" && reaction !== "dislike") {
                    setReaction(action)
                    if (reaction === "like") {
                        setLike(like - 1);
                    }
                    setDislike(dislike + 1)
                    let token = currentuser.accessToken;
                    let check = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/trip/reaction`, {
                        action: action,
                        tripId: props.review._id
                    }, {
                        headers: {
                            token: `Bearer ${token}`
                        },
                    })
                    console.log(check)
                }
                else if (action === "like" && reaction !== "like") {
                    setReaction(action)
                    if (reaction === "dislike") {
                        setDislike(dislike - 1);
                    }
                    setLike(like + 1)
                    let token = currentuser.accessToken;
                    let check = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/trip/reaction`, {
                        action: action,
                        tripId: props.review._id
                    }, {
                        headers: {
                            token: `Bearer ${token}`
                        },
                    })
                    console.log(check)
                }
                else {
                    setReaction("")
                    if (action === "like") {
                        setLike(like - 1);
                    }
                    else if (action === "dislike") {
                        setDislike(dislike - 1);
                    }
                    let token = currentuser.accessToken;
                    let check = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/trip/reaction`, {
                        action: action,
                        tripId: props.review._id
                    }, {
                        headers: {
                            token: `Bearer ${token}`
                        },
                    })
                    console.log(check)
                    setReaction("")
                }
                // let gettrustrate = await getTrustRate(user._id)
                // console.log(gettrustrate)
                // setTrustRate(gettrustrate)
                props.onReviewConditionMet()
            }
            else {
                toast.error("Bạn chưa checkin nơi này")
            }
        }
    }
    useEffect(() => {
        console.log("Check", props)
        setAllReviews(props.place)
        // Check xem đã like hay dislike chưa
        const fetchTrustRate = async () => {
            console.log("User ", user)
            let gettrustrate = await getTrustRate(user._id)
            console.log(gettrustrate)
            setTrustRate(gettrustrate)
        }
        fetchTrustRate()
        if (props.review?.like && props.review?.like.length > 0) {
            setLike(props.review.like.length)
            if (props.review.like.includes(currentuser._id)) setReaction("like")
        }

        if (props.review?.dislike && props.review?.dislike.length > 0) {
            setDislike(props.review.dislike.length)
            if (props.review.dislike.includes(currentuser._id)) setReaction("dislike")
        }
        setRate(props.review.rate)
    }, [props]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="review__wrapper">
            <div className="review">
                <div className="review__row1">
                    <div className="review__column1">
                        <div className="review__owner">
                            <div>
                                <img src={user?.avatar} alt="Ảnh avatar"></img>
                            </div>
                            <div>
                                <div className="review__name">
                                    {`${user?.firstName} ${user?.lastName}`}
                                </div>
                                <div className="review__verify">
                                    {`Độ tin cậy: ${trustrate.toFixed(0)}`}
                                </div>
                            </div>
                        </div>
                        <div className="review__time">
                            {`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`}
                        </div>
                        <div className="review__verify" style={{ paddingLeft: "0px", bottom: "0" }}>
                            <a href={`https://sepolia.etherscan.io/tx/${props.review.trHash}`} rel="noopener noreferrer" target="_blank">Xác thực cảm nghĩ</a>
                        </div>
                    </div>
                </div>
                <div className="review__row2">
                    <div className="review__detail">
                        <div className="review__title">
                            {props.review.title}
                        </div>
                        <div className="review__content">
                            {props.review.review}
                        </div>
                        <div className="review__listimgs">
                            <div className="review-img-wrapper">
                                <Gallery>
                                    {
                                        props.review?.list_imgs && props.review.list_imgs.map((item, index) => (
                                            <div className="review-img">
                                                <Item
                                                    original={item}
                                                    thumbnail={item}
                                                    width="1024"
                                                    height="768"
                                                    key={index}
                                                >
                                                    {({ ref, open }) => (
                                                        <img className="review-img-inside" ref={ref} onClick={open} src={item} alt="ảnh" />
                                                    )}
                                                </Item>
                                            </div>
                                        ))
                                    }
                                </Gallery>
                            </div>
                        </div>
                        <div className="review__reaction">
                            <div className="review__reaction">
                                <button
                                    className={`like-button ${reaction === "like" ? "active" : ""}`}
                                    onClick={() => handleReaction("like")}
                                >
                                    <ThumbUpIcon />
                                    <span>{like}</span>
                                </button>
                                <button
                                    className={`dislike-button ${reaction === "dislike" ? "active" : ""}`}
                                    onClick={() => handleReaction("dislike")}
                                >
                                    <ThumbDownIcon />
                                    <span>{dislike}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="review__column2">
                        <Rating name="size-large" value={rate} precision={0.5} size="large" readOnly />

                    </div>

                </div>
            </div >
        </div>
    );
}
export default Review;