import { useState, useEffect } from 'react';
import "./css/Comment.scss"
import defaultAvtar from '../../assets/imgs/default-avatar.jpg';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

const Comment = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [avt, setAvt] = useState(props?.data?.user?.avatar ? props.data?.user.avatar : null)
    const [fname, setFName] = useState(props?.data?.user?.firstName ? props.data.user.firstName : "Your name");
    const [lname, setLName] = useState(props?.data?.user?.lastName ? props.data.user.lastName : "Your name");
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
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
    useEffect(() => {
        // console.log("Props", props)
    }, [props])
    return (
        <div className="comment-wrapper">
            <div className="comment__header">
                <div className="comment__avatar">
                    <Avatar
                        alt="Avatar người dùng"
                        src={avt ? avt : defaultAvtar}
                        sx={{ width: 50, height: 50 }}
                    />
                </div>
                <div className="comment__infors">
                    <div className="comment__name">{`${fname} ${lname}`}</div>
                    <div className="comment__time">
                        {props?.data?.createdAt}
                    </div>
                </div>
                <div className="comment__content">
                    {props?.data?.content}
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
        </div>
    )
}

export default Comment;
