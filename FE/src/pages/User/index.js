import "./css/User.scss";
import React, { useState, useRef, useEffect } from "react";
import Container from "@mui/material/Container";
import { TextField, Button, Avatar, Input } from '@mui/material';
import { getInfor } from "../../state/selectors";
import { useSelector } from "react-redux"
import { createAxios } from "../../utils/createInstance"
import 'react-toastify/dist/ReactToastify.css';
import { changeAvatar, changeInfor, setInfor } from "../../state/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// import img from "../../assets/imgs/avatar.png"
const User = () => {
    let user = useSelector(getInfor);
    const [firstname, setFirstname] = useState(user?.firstName ? user.firstName : "");
    const [lastname, setLastname] = useState(user?.lastName ? user.lastName : "");
    const [email, setEmail] = useState(user?.email ? user.email : "");
    const [phonenumber, setPhonenumber] = useState(user?.phonenumber ? user.phonenumber : "");
    const [avatar, setAvatar] = useState(user?.avatar ? user.avatar : "");
    const [avatarchange, setAvatarchange] = useState(user?.avatar ? user.avatar : "");
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, setInfor);
    // const navigate = useNavigate();
    const form1Ref = useRef(null);
    const form2Ref = useRef(null);

    const handleSubmit1 = async (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("avatar", avatar);
        let token = user.accessToken;
        console.log(user)
        dispatch(changeAvatar({ token, formData, axiosJWT }, dispatch))
    };
    const handleSubmit2 = async (event) => {
        event.preventDefault();
        let token = user.accessToken;
        let data = {
            firstName: firstname,
            lastName: lastname,
            email: email,
            phonenumber: phonenumber
        }
        dispatch(changeInfor({ token, data, axiosJWT }, { dispatch }));
    };

    const handleFileChange = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        setAvatar(file);
        if (typeof (file) !== String)
            setAvatarchange(URL.createObjectURL(file))
        else setAvatarchange("")
    };
    useEffect(() => {
        if (user.firstName === "" || user.lastname === "") {
            toast.error("Cần nhập đủ thông tin để thực hiện các chức năng khác")
        }
    }, [user])
    return (
        <section className='user-page'>
            <Container maxWidth="lg">
                <div className='user'>
                    <div className="user__title">
                        <h1>THÔNG TIN NGƯỜI DÙNG</h1>
                    </div>
                    <div className='user__field1'>
                        <div className="user__avatarchange-container">
                            <Avatar className="user__avatar" alt="Remy Sharp" src={avatarchange ? avatarchange : avatar} sx={{ width: 200, height: 200 }} style={{ border: 0 }} />
                            <input
                                type="file"
                                className="user__avatarchange"
                                onChange={(event) => handleFileChange(event)}
                                accept="image/*"
                            />
                            <p>Sửa ảnh</p>
                        </div>
                        <form ref={form1Ref} onSubmit={handleSubmit1}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Đổi Avatar
                            </Button>
                        </form>
                    </div>
                    <div className='user__field2'>
                        <form ref={form2Ref} onSubmit={handleSubmit2}>
                            <TextField
                                id="firstname"
                                label="Tên"
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                size="small"
                                fullWidth
                            />
                            <TextField
                                id="lastname"
                                label="Họ và tên lót"
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                size="small"
                                fullWidth
                            />
                            <TextField
                                id="email"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                size="small"
                                fullWidth
                            />
                            <TextField
                                id="phonenumber"
                                label="Số điện thoại"
                                type="text"
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                size="small"
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Đổi thông tin
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </section>

    );
}

export default User;