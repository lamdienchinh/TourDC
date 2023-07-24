import img from "../assets/imgs/slider_banner_1.png";
const types = [
    {
        id: 1,
        type: 'danh lam',
        title: 'Danh lam',
        img: img,
        rate: 5,
        address: 'ADDRESS1',
        comment: 120,
        content: 'Đây là một địa danh ở tỉnh An Giang'
    },
    {
        id: 2,
        type: 'di tich',
        title: 'Di tích',
        img: img,
        rate: 5,
        address: 'ADDRESS2',
        comment: 124,
        content: 'Đây là một địa danh ở tỉnh An Giang'
    },
    {
        id: 3,
        type: 'am thuc',
        title: 'Ẩm thực',
        img: img,
        rate: 5,
        address: 'ADDRESS3',
        comment: 123,
        content: 'Đây là một địa danh ở tỉnh An Giang'
    },
    {
        id: 4,
        type: 'giai tri',
        title: 'Giải trí',
        img: img,
        rate: 5,
        address: 'ADDRESS4',
        comment: 122,
        content: 'Đây là một địa danh ở tỉnh An Giang'
    },
    {
        id: 5,
        type: 'noi o',
        title: 'Nơi ở',
        img: img,
        rate: 5,
        address: 'ADDRESS5',
        comment: 121,
        content: 'Đây là một địa danh ở tỉnh An Giang'
    }
];
const trips =
{
    place: "Rừng Tràm",
    id: 1,
    title: "Chuyến đi 1",
    time: "2023-07-01",
    description: "Mô tả chuyến đi 1, Đây là một chuyến đi vô cùng thú vị",
    rating: 4,
    images: [
        {
            "id": 1,
            "url": img
        },
        {
            "id": 2,
            "url": img
        }
    ]
}

const placenames = [
    "Rừng Tràm Trà Sư",
    "Hồ & Chùa Pà Tạ",
    "Hồ Latina",
    "Chùa Koh Kas",
    "Bún cá Hiếu Thuận",
    "Miếu Bà Chúa Xứ Núi Sam",
    "Quán nướng 368",
    "Lẩu Mắm Hiếu Miênn",
    "Quán Bò Tư Thiên ",
    "Bánh Bò Út Dứt",
    "Little Sài Gòn Hostel",
    "SANG NHU NGOC RESORT",
    "khách sạn châu tiến",
    "Khách sạn The Luxe Châu Đốc",
    "Dong Bao Hotel",
    "Trại cá sấu Long Xuyên",
    "Flyhigh Trampoline Park",
    "Thanh Long Water Park",
    "Lotte Cinema Mĩ Bình",
    "Công viên Mỹ Thới",
]
const module = {
    types, trips, placenames
}
export default module;