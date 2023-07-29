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
import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Chip, Typography } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
// import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { createAxios } from '../../utils/createInstance';
import { setInfor } from '../../state/userSlice';
import { useDispatch } from 'react-redux';
import Comment from '../comment';
import AlbumThumbnail from '../album_thumbnail';
import { deletePost } from '../../service/api';
import { getAlbums, editPost } from '../../service/api';
const FBPost = (props) => {
    const walletAddress = useSelector(getUserData)
    const currentuser = useSelector(getInfor)
    const [avtar] = useState(props.data.user.avatar ? props.data.user.avatar : false);
    const [fname] = useState(props.data.user.firstName ? props.data.user.firstName : "Your name");
    const [lname] = useState(props.data.user.lastName ? props.data.user.lastName : "Your name");
    const [time] = useState(props.data.createdAt ? props.data.createdAt : "Just Now");
    const [caption] = useState(props.data.content ? props.data.content : "Some Awesome Caption");
    const [likes, setLikes] = useState(props.data.like.length ? props.data.like.length : 0);
    const [dislikes, setDislikes] = useState(props.data.dislike.length ? props.data.dislike.length : 0);
    const [comments, setComments] = useState(props.data.comment.length ? props.data.comment.length : 0);
    const [commentlist, setCommentlist] = useState(props.data.comment ? props.data.comment : []);
    const [albums, setAlbums] = useState([]);
    const [content, setContent] = useState("");
    const [edit, setEdit] = useState(false)
    const [type, setType] = useState("");
    const [contentedit, setContentEdit] = useState("");
    const [selectedAlbums, setSelectedAlbums] = useState([]);
    const [availableAlbums, setAvailableAlbums] = useState([
    ]);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentuser, dispatch, setInfor);
    // const [Liked, setLiked] = useState(Album.liked) LẤY LIKED TRONG ALBUM TRUE/FALSE
    const [reaction, setReaction] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);


    const handleAlbumSelect = (event) => {
        setSelectedAlbums(event.target.value);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleReaction = async (action) => {
        if (walletAddress === "") {
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

    const handleEdit = async () => {
        let token = currentuser.accessToken;
        let albums = await getAlbums(token, axiosJWT);
        console.log("Album", albums);
        setAvailableAlbums(albums.data);
        setContentEdit(props.data.content);
        setType(props.data.type)
        setAlbums(props.data.albums)
        setEdit(true)
        // Xử lý khi người dùng chọn tùy chọn "Chỉnh sửa"
        // Viết code xử lý khi người dùng chọn "Chỉnh sửa" ở đây
    };

    const handleEditClose = () => {
        setEdit(false);
    };
    const handleDelete = async () => {
        // Xử lý khi người dùng chọn tùy chọn "Xoá"
        let token = currentuser.accessToken;
        let data = {
            postid: props.data._id
        }
        let check = await deletePost(token, data, axiosJWT)
        if (check) {
            toast.success("Xoá bài thành công !")
        }
        else {
            toast.error("Xoá bài thất bại")
        }
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
    const handleOpenConfirmDialog = async () => {
        setOpenConfirmDialog(true);
    };

    const handleConfirmClose = async () => {
        setOpenConfirmDialog(false);
    }
    const handleCloseConfirmDialog = async () => {
        let newdata = {
            postid: props.data._id,
            content: contentedit,
            type: type,
            albums: selectedAlbums
        }
        let token = currentuser.accessToken;
        let check = await editPost(token, newdata, axiosJWT)
        console.log("Edit", check)
        if (check) {
            setContent(contentedit);
            setAlbums(selectedAlbums)
            toast.success("Đổi thông tin post thành công")
        }
        else {
            setContentEdit("")
            setSelectedAlbums([])
            toast.error("Đổi thông tin post thất bại")
        }
        handleMenuClose();
        setOpenConfirmDialog(false);
        setEdit(false);
    };
    function formatDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);

        const year = dateTime.getFullYear();
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const day = dateTime.getDate().toString().padStart(2, '0');
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const seconds = dateTime.getSeconds().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
    const handleFormSubmit = async () => {
        let token = currentuser.accessToken;
        console.log("RUn")
        let comment = await axiosJWT.post(`${process.env.REACT_APP_ENDPOINT}/v1/post/comment`, {
            content: content,
            postid: props.data._id,
        }, {
            headers: {
                token: `Bearer ${token}`
            },
        })
        console.log(comment);
        console.log("Comment", [comment.data, ...commentlist])
        setCommentlist([comment.data, ...commentlist])
        setComments(comments + 1)
        setContent("")
    }

    useEffect(() => {
        console.log("Check", props.data);
        setAlbums(props.data.albums)
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
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
                        {formatDateTime(time)}
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
                {albums.length > 0 &&
                    <div>
                        <div className="albumshares__list">
                            <Typography>Album chia sẻ</Typography>
                        </div>
                        <div className="albums__share__list">
                            {
                                albums.map((album, index) => (
                                    <div className="albumshare__item" key={index}>
                                        <AlbumThumbnail album={album} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
            <div className="reaction__btns">
                <div className="likes">
                    <button className='likebtns' onClick={() => handleReaction("like")}>
                        {
                            reaction !== "like" ? <AiOutlineLike style={{ fontSize: `1.5rem` }} /> : <AiFillLike className="reaction-icon-active" style={{ fontSize: `1.5rem` }} />
                        }
                    </button>
                    {likes}
                </div>
                <div className="dislikes" style={{ marginLeft: "25px" }}>
                    <button className='likebtns' onClick={() => handleReaction("dislike")}>
                        {
                            reaction !== "dislike" ? <AiOutlineDislike style={{ fontSize: `1.5rem` }} /> : <AiFillDislike className="reaction-icon-active" style={{ fontSize: `1.5rem` }} />
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
                <Dialog open={openForm} onClose={handleFormClose} fullWidth maxWidth={'md'} scroll={'body'}>
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
                            {albums.length > 0 &&
                                <div>
                                    <div className="albumshares__list">
                                        <Typography>Album chia sẻ</Typography>
                                    </div>
                                    <div className="albums__share__list">
                                        {
                                            albums.map((album, index) => (
                                                <div className="albumshare__item" key={index}>
                                                    <AlbumThumbnail album={album} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="reaction__btns">
                            <div className="likes">
                                <button className='likebtns' onClick={() => handleReaction("like")}>
                                    {
                                        reaction !== "like" ? <AiOutlineLike style={{ fontSize: `1.5rem` }} /> : <AiFillLike className="reaction-icon-active" style={{ fontSize: `1.5rem` }} />
                                    }
                                    {likes}
                                </button>
                            </div>
                            <div className="dislikes" style={{ marginLeft: "25px" }}>
                                <button className='likebtns' onClick={() => handleReaction("dislike")}>
                                    {
                                        reaction !== "dislike" ? <AiOutlineDislike style={{ fontSize: `1.5rem` }} /> : <AiFillDislike className="reaction-icon-active" style={{ fontSize: `1.5rem` }} />
                                    }
                                    {dislikes}
                                </button>
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

                <Dialog open={edit} onClose={handleEditClose} disableScrollLock={true}>
                    <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth>
                            <Typography>Chọn loại bài viết bạn muốn</Typography>
                            <Select
                                autoWidth={false}
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                variant="standard"
                                MenuProps={{ disableScrollLock: true }}
                            >
                                <MenuItem value="">
                                    <em>Chọn loại</em>
                                </MenuItem>
                                <MenuItem value="Trò chuyện, tâm sự">Trò chuyện, tâm sự</MenuItem>
                                <MenuItem value="Chia sẻ cảm nghĩ, kỷ niệm">Chia sẻ cảm nghĩ, kỷ niệm</MenuItem>
                                <MenuItem value="Hỏi đáp, hỗ trợ">Hỏi đáp, hỗ trợ</MenuItem>
                                <MenuItem value="Phản ánh những vấn đề">Phản ánh những vấn đề</MenuItem>
                                <MenuItem value="Khác">Khác</MenuItem>
                            </Select>
                            <FormHelperText>Vui lòng chọn loại</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                            <Typography>
                                Nội dung
                            </Typography>
                            <TextField
                                fullWidth
                                value={contentedit}
                                id="standard-helperText"
                                variant="standard"
                                onChange={(e) => setContentEdit(e.target.value)}
                                MenuProps={{ disableScrollLock: true }}
                            />
                            <FormHelperText>Vui lòng nhập nội dung</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                            {/* TextField Multiple Select */}
                            <div>
                                <Typography>Chọn Album muốn chia sẻ</Typography>
                            </div>
                            <Select
                                multiple
                                variant="standard"
                                value={selectedAlbums}
                                onChange={handleAlbumSelect}
                                renderValue={(selected) => (
                                    <div>
                                        {selected.map((value, index) => (
                                            <Chip
                                                key={index}
                                                label={value.title}
                                            />
                                        ))}
                                    </div>
                                )}
                            >
                                {availableAlbums && availableAlbums.map((album, index) => (
                                    <MenuItem key={index} value={album}>
                                        <Chip
                                            label={album.title}
                                            color={selectedAlbums.some((selected) => selected._id === album._id) ? 'primary' : 'default'}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={handleOpenConfirmDialog} color="primary">
                            Đăng bài
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                    <DialogTitle>Xác nhận chỉnh sửa</DialogTitle>
                    <DialogContent>Bạn có chắc chắn muốn sửa đổi thông tin</DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirmClose} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={handleCloseConfirmDialog} color="primary">
                            Sửa bài
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default FBPost;
