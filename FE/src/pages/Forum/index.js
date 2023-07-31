import "./css/Forum.scss";
import { Container, Breadcrumbs, Typography, Pagination } from "@mui/material";
import { Link } from 'react-router-dom';
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
import FormHelperText from "@mui/material/FormHelperText";
import { Chip } from '@mui/material';
import { addPost, getAlbums, getPosts } from "../../service/api";
import { toast } from "react-toastify";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Forum = () => {
    const [isLoading, setIsLoading] = useState(true);
    const handleClose = () => {
        setIsLoading(false);
    };
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const [userInfor] = useState(useSelector(getInfor));
    let axiosJWT = createAxios(userInfor, dispatch, setInfor);
    const [type, setType] = useState("");
    const [content, setContent] = useState("");
    const [selectedAlbums, setSelectedAlbums] = useState([]);
    const [availableAlbums, setAvailableAlbums] = useState([
    ]);
    const [typecount, setTypecount] = useState([0, 0, 0, 0, 0])


    const fetchPosts = async () => {
        let allPost = await getPosts();
        console.log(allPost)
        setPosts(allPost.data)
        const updatedTypecount = [...typecount];
        allPost.data.forEach((post) => {
            switch (post.type) {
                case 'Trò chuyện, tâm sự':
                    updatedTypecount[0]++;
                    break;
                case 'Chia sẻ cảm nghĩ, kỷ niệm':
                    updatedTypecount[1]++;
                    break;
                case 'Hỏi đáp, hỗ trợ':
                    updatedTypecount[2]++;
                    break;
                case 'Phản ánh những vấn đề':
                    updatedTypecount[3]++;
                    break;
                case 'Khác':
                    updatedTypecount[4]++;
                    break;
                default:
                    break;
            }
        });
        setTypecount(updatedTypecount);
    }
    const fetchAlbum = async () => {
        try {
            let token = userInfor.accessToken;
            let albums = await getAlbums(token, axiosJWT);
            console.log("Album", albums);
            setAvailableAlbums(albums.data);
            setIsLoading(false);
        }
        catch (error) {
            console.log("Error", error);
        }
    }
    useEffect(() => {
        fetchPosts();
        fetchAlbum();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [poststoview, setPostsToView] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [select, setSelect] = useState(1);

    useEffect(() => {
        let start = 4 * (select - 1);
        let end = start + 4;
        if (end > posts.length) end = posts.length;
        const temp = posts.slice(start, end);
        const totalPages = Math.ceil(posts.length / 4);
        const dataonepage = temp.slice(0, 10);
        setPostsToView(dataonepage);
        setTotalPages(totalPages);
    }, [select, posts]);

    const handlePageChange = (event, number) => {
        setSelect(number);
    }

    const handleAlbumSelect = (event) => {
        setSelectedAlbums(event.target.value);
    };

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const handleOpenConfirmDialog = () => {
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };
    const handleFormSubmit = async () => {
        let albums_id = selectedAlbums.map(album => album._id)
        let data = {
            type: type,
            content: content,
            albums: albums_id
        }
        let token = userInfor.accessToken;
        let check = await addPost(data, token, axiosJWT)
        setOpenConfirmDialog(false);
        if (check) toast.success("Đăng bài thành công !")
        else toast.error("Đăng bài thất bại")
        setSelectedAlbums([])
        setContent("")
        setType("")
    }
    return (
        <div className="forum-wrapper">
            <Backdrop
                sx={{ color: '#fffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="forum__slides">
                <div className="forum__slides__content">
                    Cộng đồng giao lưu trao đổi
                </div>
                <div className="forum__slides_breadcumb">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="black" href="/">
                            Trang chủ
                        </Link>
                        <Typography color="text.primary">Diễn đàn</Typography>
                    </Breadcrumbs>
                </div>
            </div>
            <Container maxWidth="lg">
                <div className="forum__body">
                    <div className="forum__posts">
                        <div className="forum__btn__wrapper">
                            <div className="create__post" style={{ width: '100%' }}>
                                <div className="createpost-item">
                                    <FormControl fullWidth disableScrollLock>
                                        <Typography>Chọn loại bài viết bạn muốn</Typography>
                                        <Select
                                            autoWidth={false}
                                            helperText="Vui lòng chọn loại"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                            label="Loại"
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
                                </div>
                                <div className="createpost-item">
                                    <FormControl fullWidth>
                                        <Typography>
                                            Nội dung
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            value={content}
                                            id="standard-helperText"
                                            // label="Nội dung"
                                            multiline
                                            minRows={4}
                                            helperText="Some important text"
                                            variant="standard"
                                            onChange={(e) => setContent(e.target.value)}
                                            MenuProps={{ disableScrollLock: true }}
                                        />
                                    </FormControl>
                                </div>
                                <div className="createpost-item">
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
                                            MenuProps={{ disableScrollLock: true }}
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
                                </div>
                                <div className="createpost__btn">
                                    <Button onClick={handleOpenConfirmDialog} color="primary">
                                        Đăng bài
                                    </Button>
                                </div>
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
                        </div>
                        {
                            poststoview && poststoview.length > 0 ? <div>
                                <h1>Danh sách bài viết</h1>
                                <LazyLoad>
                                    {poststoview.map((post, index) => (
                                        <FBPost
                                            key={index}
                                            data={post}
                                        />
                                    ))}
                                </LazyLoad>
                            </div> : ""
                        }
                        {
                            isLoading === false ? <div className="forum__pagination">
                                <Pagination count={totalPages} onChange={handlePageChange} showFirstButton showLastButton color="primary" />
                            </div> : ""
                        }
                    </div>
                    <div className="forum__sidebar">
                        <div className="forum-categories-item">
                            Trò chuyện, tâm sự ({typecount[0]})
                        </div>
                        <div className="forum-categories-item">
                            Chia sẻ cảm nghĩ, kỷ niệm ({typecount[1]})
                        </div>
                        <div className="forum-categories-item">
                            Hỏi đáp, hỗ trợ ({typecount[2]})
                        </div>
                        <div className="forum-categories-item">
                            Phản ánh những vấn đề ({typecount[3]})
                        </div>
                        <div className="forum-categories-item">
                            Khác ({typecount[4]})
                        </div>
                        <div className="forum-categories-item forum__mypost">
                            <Link to="/myposts" style={{ textDecoration: "none" }}>
                                <Button variant="standard" >
                                    POSTS CỦA BẠN
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div >
            </Container >
        </div >
    );
}

export default Forum;