import React, { useEffect } from 'react';
import { useState } from 'react';
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike, AiOutlineComment } from "react-icons/ai"
import './css/Post.scss';
import Avatar from '@mui/material/Avatar';
import defaultAvtar from '../../assets/imgs/default-avatar.jpg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { getUserData, getInfor } from '../../state/selectors';
import { toast } from "react-toastify"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { createAxios } from '../../utils/createInstance';
import { setInfor } from '../../state/userSlice';
import { useDispatch } from 'react-redux';
import Comment from '../comment';

const FBPost = (props) => {
    const walletAddress = useSelector(getUserData)
    const currentuser = useSelector(getInfor)
    const [avtar, setAvtar] = useState(props.data.user.avatar ? props.data.user.avatar : false);
    const [fname, setFName] = useState(props.data.user.firstName ? props.data.user.firstName : "Your name");
    const [lname, setLName] = useState(props.data.user.lastName ? props.data.user.lastName : "Your name");
    const [time, setTime] = useState(props.data.createdAt ? props.data.createdAt : "Just Now");
    const [caption, setCaption] = useState(props.data.content ? props.data.content : "Some Awesome Caption");
    const [likes, setLikes] = useState(props.data.like.length ? props.data.like.length : 0);
    const [dislikes, setDislikes] = useState(props.data.dislike.length ? props.data.dislike.length : 0);
    const [comments, setComments] = useState(props.data.comment.length ? props.data.comment.length : 0);
    const [commentlist, setCommentlist] = useState(props.data.comment ? props.data.comment : []);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentuser, dispatch, setInfor);
    // const [Liked, setLiked] = useState(Album.liked) LẤY LIKED TRONG ALBUM TRUE/FALSE
    const [reaction, setReaction] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleReaction = async (action) => {
        if (walletAddress == "") {
            toast.error("Bạn chưa đăng nhập")
        }
        else {

            if (action === "dislike" && reaction !== "dislike") {
                setReaction(action)
                if (reaction === "like") {
                    setLikes(likes - 1);
                }
                setDislikes(dislikes + 1)
                let token = currentuser.accessToken;
                let check = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/post/reaction`, {
                    action: action,
                    postid: props.data._id
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
                    setDislikes(dislikes - 1);
                }
                setLikes(likes + 1)
                let token = currentuser.accessToken;
                let check = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/post/reaction`, {
                    action: action,
                    postid: props.data._id
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
                    setLikes(likes - 1);
                }
                else if (action === "dislike") {
                    setDislikes(dislikes - 1);
                }
                let token = currentuser.accessToken;
                let check = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/post/reaction`, {
                    action: action,
                    postid: props.data._id
                }, {
                    headers: {
                        token: `Bearer ${token}`
                    },
                })
                console.log(check)
                setReaction("")
            }
        }
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        // Xử lý khi người dùng chọn tùy chọn "Chỉnh sửa"
        handleMenuClose();
        // Viết code xử lý khi người dùng chọn "Chỉnh sửa" ở đây
    };

    const handleDelete = () => {
        // Xử lý khi người dùng chọn tùy chọn "Xoá"
        handleMenuClose();
        // Viết code xử lý khi người dùng chọn "Xoá" ở đây
    };

    const [openForm, setOpenForm] = useState(false);

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const handleFormOpen = () => {
        setOpenForm(true);
    };

    const handleFormClose = () => {
        setOpenForm(false);
    };
    const handleOpenConfirmDialog = () => {
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };
    const [content, setContent] = useState("");
    const handleFormSubmit = async () => {
        let token = currentuser.accessToken;
        let comment = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/post/comment`, {
            content: content,
            postid: props.data._id,
        }, {
            headers: {
                token: `Bearer ${token}`
            },
        })
        console.log(comment);
        setCommentlist([...commentlist, comment.data])
        setComments(comments + 1)
        setContent("")
        // setOpenForm(false);
        // if (check) toast.success("Đăng bài thành công !")
        // else toast.error("Đăng bài thất bại")
        setContent("")
    }

    useEffect(() => {
        console.log("Check", props.data);
        if (props.data?.like && props.data?.like.length >= 0) {
            setLikes(props.data.like.length)
            const likeArray = props.data.like;
            let isCurrentUserLiked = false;
            for (let i = 0; i < likeArray.length; i++) {
                if (likeArray[i]._id === currentuser._id) {
                    isCurrentUserLiked = true;
                    break;
                }
            }
            if (isCurrentUserLiked) {
                setReaction("like");
            }
        }

        if (props.data?.dislike && props.data?.dislike.length >= 0) {
            setDislikes(props.data.dislike.length)
            const dislikeArray = props.data.dislike;
            let isCurrentUserDisLiked = false;
            for (let i = 0; i < dislikeArray.length; i++) {
                if (dislikeArray[i]._id === currentuser._id) {
                    isCurrentUserDisLiked = true;
                    break;
                }
            }
            if (isCurrentUserDisLiked) {
                setReaction("dislike");
            }
        }
    }, [props])

    return (
        <div className="post">
            <div className="post__header">
                <div className="post__avatar">
                    <Avatar
                        alt="Avatar người dùng"
                        src={avtar ? avtar : defaultAvtar}
                        sx={{ width: 50, height: 50 }}
                    />
                </div>
                <div className="post__infors">
                    <div className="post__name">{`${fname} ${lname}`}</div>
                    <div className="post__time">
                        {time}
                    </div>
                </div>
                <div className="post__dots">
                    <MoreHorizIcon onClick={handleMenuOpen} />
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        disableScrollLock={true}
                    >
                        <MenuItem onClick={handleEdit}>Chỉnh sửa</MenuItem>
                        <MenuItem onClick={handleDelete}>Xoá</MenuItem>
                    </Menu>
                </div>
            </div>

            <div className="caption">{caption}</div>
            <div className="albumshare">
                <div>
                    <h2>Album chia sẻ</h2>
                </div>
                <div>

                </div>
            </div>
            <div className="btns">
                <div className="likes">
                    <button className='likebtns' onClick={() => handleReaction("like")}>
                        {
                            reaction !== "like" ? <AiOutlineLike style={{ fontSize: `1rem` }} /> : <AiFillLike style={{ fontSize: `1rem` }} />
                        }
                    </button>
                    {likes}
                </div>
                <div className="dislikes" style={{ marginLeft: "25px" }}>
                    <button className='likebtns' onClick={() => handleReaction("dislike")}>
                        {
                            reaction !== "dislike" ? <AiOutlineDislike style={{ fontSize: `1rem` }} /> : <AiFillDislike style={{ fontSize: `1rem` }} />
                        }
                    </button>
                    {dislikes}
                </div>
                <div className="comment" style={{ marginLeft: "25px" }}>
                    <button className='likebtns' onClick={handleFormOpen}> <AiOutlineComment style={{ fontSize: `20px` }} /></button>
                    {comments}
                </div>
            </div>
            <div>
                <Dialog open={openForm} onClose={handleFormClose} fullWidth maxWidth={'xl'} scroll={'body'}>
                    <div className="post">
                        <div className="post__header">
                            <div className="post__avatar">
                                <Avatar
                                    alt="Avatar người dùng"
                                    src={avtar ? avtar : defaultAvtar}
                                    sx={{ width: 50, height: 50 }}
                                />
                            </div>
                            <div className="post__infors">
                                <div className="post__name">{`${fname} ${lname}`}</div>
                                <div className="post__time">
                                </div>
                                {time}
                            </div>
                            <div className="post__dots">
                                <MoreHorizIcon onClick={handleMenuOpen} />
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                    disableScrollLock={true}
                                >
                                    <MenuItem onClick={handleEdit}>Chỉnh sửa</MenuItem>
                                    <MenuItem onClick={handleDelete}>Xoá</MenuItem>
                                </Menu>
                            </div>
                        </div>

                        <div className="caption">{caption}</div>
                        <div className="albumshare">
                            <div>
                                <h2>Album chia sẻ</h2>
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="btns">
                            <div className="likes">
                                <button className='likebtns' onClick={() => handleReaction("like")}>
                                    {
                                        reaction !== "like" ? <AiOutlineLike style={{ fontSize: `1rem` }} /> : <AiFillLike style={{ fontSize: `1rem` }} />
                                    }
                                </button>
                                {likes}
                            </div>
                            <div className="dislikes" style={{ marginLeft: "25px" }}>
                                <button className='likebtns' onClick={() => handleReaction("dislike")}>
                                    {
                                        reaction !== "dislike" ? <AiOutlineDislike style={{ fontSize: `1rem` }} /> : <AiFillDislike style={{ fontSize: `1rem` }} />
                                    }
                                </button>
                                {dislikes}
                            </div>
                            <div className="comment" style={{ marginLeft: "25px" }}>
                                <button className='likebtns' onClick={handleFormOpen}> <AiOutlineComment style={{ fontSize: `20px` }} /></button>
                                {comments}
                            </div>
                        </div>
                    </div>
                    <DialogTitle>Bình luận</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            value={content}
                            id="standard-helperText"
                            label="Nội dung"
                            helperText="Some important text"
                            variant="standard"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </DialogContent>
                    <div className="comment-btn">
                        <Button onClick={handleFormSubmit} color="primary">
                            Bình luận
                        </Button>
                    </div>
                    <div className="comment__all">
                        {
                            commentlist && commentlist.map((comment, index) => (
                                <Comment data={comment} key={index}></Comment>
                            ))
                        }
                    </div>
                </Dialog>
                {/* <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                    <DialogTitle>Xác nhận đăng bài</DialogTitle>
                    <DialogContent>Bạn có chắc chắn muốn bình luận</DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseConfirmDialog} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={handleFormSubmit} color="primary">
                            Đăng bài
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </div>
        </div>
    );
}

export default FBPost;
