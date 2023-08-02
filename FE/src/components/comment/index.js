import { useState, useEffect } from 'react';
import "./css/Comment.scss"
import defaultAvtar from '../../assets/imgs/default-avatar.jpg';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

const Comment = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [avt, setAvt] = useState(props?.data?.user?.avatar ? props.data?.user.avatar : null)
    const [fname, setFname] = useState(props?.data?.user?.firstName ? props.data.user.firstName : "Your name");
    const [lname, setLname] = useState(props?.data?.user?.lastName ? props.data.user.lastName : "Your name");
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

    useEffect(()=> {
        setAvt(props?.data?.user?.avatar)
        setFname(props?.data?.user?.firstName)
        setLname(props?.data?.user?.lastName)
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
                        {formatDateTime(props?.data?.createdAt)}
                    </div>
                </div>
                <div className="comment__content">
                    {props?.data?.content}
                </div>
                {/* <div className="post__dots">
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
                </div> */}
            </div>
        </div>
    )
}

export default Comment;
