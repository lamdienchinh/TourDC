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
const products = [
    {
        id: 1,
        name: 'Voucher 1',
        description: 'Mô tả sản phẩm 1',
        price: '$10',
        imageUrl: 'https://blog.topcv.vn/wp-content/uploads/2021/06/voucher-la-gi.jpg',
        used: false,
        purchaseDate: '08:30 10-09-2023',
    },
    {
        id: 2,
        name: 'Voucher 2',
        description: 'Mô tả sản phẩm 2',
        price: '$20',
        imageUrl: 'https://blog.topcv.vn/wp-content/uploads/2021/06/voucher-la-gi.jpg',
        used: false,
        purchaseDate: '10:45 11-09-2023',
    },
    {
        id: 3,
        name: 'Voucher 3',
        description: 'Mô tả sản phẩm 3',
        price: '$15',
        imageUrl: 'https://blog.topcv.vn/wp-content/uploads/2021/06/voucher-la-gi.jpg',
        used: false,
        purchaseDate: '14:20 12-09-2023',
    },
    {
        id: 4,
        name: 'Voucher 4',
        description: 'Mô tả sản phẩm 4',
        price: '$25',
        imageUrl: 'https://blog.topcv.vn/wp-content/uploads/2021/06/voucher-la-gi.jpg',
        used: false,
        purchaseDate: '09:10 13-09-2023',
    },
    {
        id: 5,
        name: 'Voucher 5',
        description: 'Mô tả sản phẩm 5',
        price: '$18',
        imageUrl: 'https://blog.topcv.vn/wp-content/uploads/2021/06/voucher-la-gi.jpg',
        used: false,
        purchaseDate: '11:30 14-09-2023',
    },
    {
        id: 6,
        name: 'Voucher 6',
        description: 'Mô tả sản phẩm 6',
        price: '$30',
        imageUrl: 'https://blog.topcv.vn/wp-content/uploads/2021/06/voucher-la-gi.jpg',
        used: false,
        purchaseDate: '13:45 15-09-2023',
    },
    {
        id: 7,
        name: 'Voucher 7',
        description: 'Mô tả sản phẩm 7',
        price: '$12',
        imageUrl: 'https://blog.topcv.vn/wp-content/uploads/2021/06/voucher-la-gi.jpg',
        used: false,
        purchaseDate: '16:00 16-09-2023',
    },
    {
        id: 8,
        name: 'Voucher 8',
        description: 'Mô tả sản phẩm 8',
        price: '$22',
        imageUrl: 'https://blog.topcv.vn/wp-content/uploads/2021/06/voucher-la-gi.jpg',
        used: false,
        purchaseDate: '10:15 17-09-2023',
    },
    {
        id: 9,
        name: 'Voucher 9',
        description: 'Mô tả sản phẩm 9',
        price: '$28',
        imageUrl: 'https://blog.topcv.vn/wp-content/uploads/2021/06/voucher-la-gi.jpg',
        used: false,
        purchaseDate: '15:30 18-09-2023',
    },
    {
        id: 10,
        name: 'Voucher 10',
        description: 'Mô tả sản phẩm 10',
        price: '$14',
        imageUrl: 'https://blog.topcv.vn/wp-content/uploads/2021/06/voucher-la-gi.jpg',
        used: false,
        purchaseDate: '17:20 19-09-2023',
    },
    {
        id: 11,
        name: 'Voucher 11',
        description: 'Mô tả sản phẩm 11',
        price: '$19',
        imageUrl: 'https://blog.topcv.vn/wp-content/uploads/2021/06/voucher-la-gi.jpg',
        used: false,
        purchaseDate: '12:40 20-09-2023',
    },
    {
        id: 12,
        name: 'Voucher 12',
        description: 'Mô tả sản phẩm 12',
        price: '$16',
        imageUrl: 'https://blog.topcv.vn/wp-content/uploads/2021/06/voucher-la-gi.jpg',
        used: false,
        purchaseDate: '08:55 21-09-2023',
    },
];

const module = {
    types, trips, placenames, products
}
export default module;