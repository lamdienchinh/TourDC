import "./css/Forum.scss";
import { Container, Breadcrumbs, Typography, Pagination, Skeleton } from "@mui/material";
import Link from '@mui/material/Link';
import { useState, useEffect } from "react"
import LazyLoad from 'react-lazyload';
import { createAxios } from "../../utils/createInstance";
import { setInfor } from "../../state/userSlice";
import { useDispatch } from "react-redux";
import { getInfor } from '../../state/selectors';
import { useSelector } from 'react-redux'
import MenuItem from '@mui/material/MenuItem';
import FBPost from "../../components/post";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Chip } from '@mui/material';
import { addPost, getPosts } from "../../service/api";
import { toast } from "react-toastify";
const Forum = () => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const [userInfor, serUserInfor] = useState(useSelector(getInfor));
    let axiosJWT = createAxios(userInfor, dispatch, setInfor);


    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {

    };

    const Album = {
        title: "hello",
        content: 'This is album content',
        createdAt: '2023-07-22T10:48:34.127+00:00',
        list_trips: [],
        liked: false,
        disliked: false,
        likes: 10,
        dislikes: 10
    }
    const [openForm, setOpenForm] = useState(false);
    const [type, setType] = useState("");
    const [content, setContent] = useState("");
    const [selectedAlbums, setSelectedAlbums] = useState([]);
    const [availableAlbums] = useState([ // Danh sách album mẫu, bạn có thể thay thế bằng dữ liệu thực tế
        { id: 1, name: "Album 1", backgroundImage: "url-to-image-1" },
        { id: 2, name: "Album 2", backgroundImage: "url-to-image-2" },
        // Thêm các album khác tương tự...
    ]);
    useEffect(() => {
        const fetchPosts = async () => {
            let allPost = await getPosts();
            console.log(allPost)
            setPosts(allPost.data)
        }
        fetchPosts()
    }, []);
    const handleAlbumSelect = (event) => {
        setSelectedAlbums(event.target.value);
    };

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
    const handleFormSubmit = async () => {
        let data = {
            type: type,
            content: content,
            // album: selectedAlbums
        }
        let token = userInfor.accessToken;
        let check = await addPost(data, token, axiosJWT)
        setOpenConfirmDialog(false);
        setOpenForm(false);
        if (check) toast.success("Đăng bài thành công !")
        else toast.error("Đăng bài thất bại")
        setSelectedAlbums([])
        setContent("")
        setType("")
    }
    return (
        <div className="forum-wrapper">
            <div className="forum__slides">
                <div className="forum__slides__content">
                    Cộng đồng giao lưu trao đổi
                </div>
                <div className="forum__slides_breadcumb">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="/">
                            Home
                        </Link>
                        <Typography color="text.primary">Forum</Typography>
                    </Breadcrumbs>
                </div>
            </div>
            <Container maxWidth="lg">
                <div className="create__post">
                    <Button variant="outlined" color="primary" onClick={handleFormOpen}>Tạo bài viết mới</Button>
                    <Dialog open={openForm} onClose={handleFormClose} disableScrollLock={true}>
                        <DialogTitle>Tạo bài viết mới</DialogTitle>
                        <DialogContent>
                            <FormControl fullWidth>
                                <TextField
                                    helperText="Vui lòng chọn loại"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    label="Loại"
                                    id="standard-select-currency-native"
                                    select
                                    variant="standard"
                                >
                                    <MenuItem value="option1">Tùy chọn 1</MenuItem>
                                    <MenuItem value="option2">Tùy chọn 2</MenuItem>
                                    <MenuItem value="option3">Tùy chọn 3</MenuItem>
                                    <MenuItem value="option4">Tùy chọn 4</MenuItem>
                                    <MenuItem value="option5">Tùy chọn 5</MenuItem>
                                </TextField>
                            </FormControl>
                            <TextField
                                fullWidth
                                value={content}
                                id="standard-helperText"
                                label="Nội dung"
                                helperText="Some important text"
                                variant="standard"
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <FormControl fullWidth>
                                {/* TextField Multiple Select */}
                                <div>
                                    <h3>Chọn Album muốn chia sẻ</h3>
                                </div>
                                <Select
                                    multiple
                                    variant="standard"
                                    value={selectedAlbums}
                                    onChange={handleAlbumSelect}
                                    renderValue={(selected) => (
                                        <div>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value.id}
                                                    label={value.name}
                                                />
                                            ))}
                                        </div>
                                    )}
                                >
                                    {availableAlbums.map((album) => (
                                        <MenuItem key={album.id} value={album}>
                                            <TextField
                                                id={`checkbox-${album.id}`}
                                                sx={{ display: "none" }}
                                                checked={selectedAlbums.some((selected) => selected.id === album.id)}
                                            />
                                            <label htmlFor={`checkbox-${album.id}`}>
                                                <Chip label={album.name} />
                                            </label>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleFormClose} color="primary">
                                Hủy
                            </Button>
                            <Button onClick={handleOpenConfirmDialog} color="primary">
                                Đăng bài
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog} disableScrollLock={true}>
                        <DialogTitle>Xác nhận đăng bài</DialogTitle>
                        <DialogContent>Bạn có chắc chắn muốn đăng bài này?</DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseConfirmDialog} color="primary">
                                Hủy
                            </Button>
                            <Button onClick={handleFormSubmit} color="primary">
                                Đăng bài
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className="forum__helpers">
                    <div className="forum__search"></div>
                    <div className="forum__filter"></div>
                    <div className="forum__create"></div>
                </div>
                <div className="forum__posts">
                    <h1>Danh sách bài viết</h1>
                    <LazyLoad>
                    </LazyLoad>
                    {posts.map((post, index) => (
                        <FBPost
                            key={index}
                            data={post}
                        />
                    ))}
                </div>
                <div className="forum__sidebar">
                    <div>

                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Forum;