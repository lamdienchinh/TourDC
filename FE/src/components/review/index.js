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
    const calculateTrustRate = (like, dislike) => {
        // Chỉ tính trust rate nếu cả like và dislike đều khác 0
        if (like !== 0 && like + dislike !== 0) {
            return like * 100 / (like + dislike);
        }

        // Trường hợp like và dislike đều bằng 0 hoặc chia 0, trust rate sẽ là 0
        return 0;
    };
    const handleReaction = async (action) => {
        if (walletAddress === "") {
            toast.error("Bạn chưa đăng nhập")
        }
        else {
            console.log("Current", currentuser)
            console.log("All Reviews", allReviews)
            let find = allReviews.filter(item => item.user._id === currentuser._id);
            if (find) {
                if (action === "dislike" && reaction !== "dislike") {
                    setReaction(action)
                    await new Promise((resolve) => setTimeout(resolve, 0));
                    setTrustRate(calculateTrustRate(like, dislike + 1))
                    if (reaction === "like") {
                        setTrustRate(calculateTrustRate(like - 1, dislike + 1))
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
                    await new Promise((resolve) => setTimeout(resolve, 0));
                    setTrustRate(calculateTrustRate(like + 1, dislike))
                    if (reaction === "dislike") {
                        setTrustRate(calculateTrustRate(like + 1, dislike - 1))
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
                        setTrustRate(calculateTrustRate(like - 1, dislike))
                        setLike(like - 1);
                    }
                    else if (action === "dislike") {
                        setTrustRate(calculateTrustRate(like, dislike - 1))
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
        let total = 0;
        if (props.review?.like && props.review?.like.length > 0) {
            setLike(props.review.like.length)
            if (props.review.like.includes(currentuser._id)) setReaction("like")
            total += props.review.like.length
        }

        if (props.review?.dislike && props.review?.dislike.length > 0) {
            setDislike(props.review.dislike.length)
            if (props.review.dislike.includes(currentuser._id)) setReaction("dislike")
            total += props.review.dislike.length
        }
        if (total > 0) {
            setTrustRate(props.review?.like.length * 100 / total);
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="review">
            <div className="review__row1">
                <div className="review__column1">
                    <div className="review__owner">
                        <div>
                            <img src={user?.avatar} alt="Ảnh avatar"></img>
                        </div>
                        <div className="review__name">
                            {`${user?.firstName} ${user?.lastName}`}
                        </div>
                    </div>
                    <div className="review__verify">
                        <a href={`https://sepolia.etherscan.io/tx/${props.review.trHash}`} rel="noopener noreferrer" target="_blank">Xác thực cảm nghĩ</a>
                    </div>
                    <div className="review__verify">
                        {`Độ tin cậy: ${trustrate}`}
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
            </div>
        </div >
    );
}
export default Review;