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

const options = {
    // ---------------------
    // Colors & Font Size
    // ---------------------
    styles: {
        colors: {
            primary: "#377dff",     // Primary buttons & links
            active: "#528fff",      // Primary buttons & links (hover). Inferred if undefined.
            error: "#d23f4d",       // Error messages
            shade100: "#333",       // Standard text
            shade200: "#7a7a7a",    // Secondary button text
            shade300: "#999",       // Secondary button text (hover)
            shade400: "#a5a6a8",    // Welcome text
            shade500: "#d3d3d3",    // Modal close button
            shade600: "#dddddd",    // Border
            shade700: "#f0f0f0",    // Progress indicator background
            shade800: "#f8f8f8",    // File item background
            shade900: "#fff"        // Various (draggable crop buttons, etc.)
        },
        fontFamilies: {
            base: "-apple-system, blinkmacsystemfont, Segoe UI, helvetica, arial, sans-serif"
        },
        fontSizes: {
            base: 16
        }
    },

    // ---------------------
    // Image Editor
    // ---------------------
    editor: {
        images: {
            preview: true,          // True by default if cropping is enabled. Supports videos & PDFs too.
            crop: true,             // True by default. False disables the image editor / cropper.
            cropRatio: 4 / 3,
            cropShape: "rect"       // "rect" | "circ"
        }
    },

    // ---------------------
    // Accepted Files
    // ---------------------
    maxFileCount: 10,
    maxFileSizeBytes: 5 * 1024 * 1024,
    // mimeTypes: ["image/jpeg"],
    multi: true,

    // ---------------------
    // File Upload Behaviour
    // ---------------------
    // path: {                      // Optional: can be a string (full file path) or an object like so:
    //     fileName: "Example.jpg",   // Each supports path variables (e.g. {ORIGINAL_FILE_EXT}). See your
    //     folderPath: "/uploads"     // API key's config in the Upload Dashboard for all path variables.
    // },
    metadata: {},                // Arbitrary JSON object (to save against the file).
    tags: [],                    // Array of strings (to save against the file).

    // ---------------------
    // Other UI Behaviour
    // ---------------------
    layout: "modal",            // "modal" | "inline" (i.e. to create a dropzone)
    container: "body",          // Parent element to render the widget in.
    // locale: myCustomLocale,
    onUpdate: files => { },
    onValidate: async file => { /* Return a string to display a custom error. */ },
    showFinishButton: true,
    showRemoveButton: true
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { types, trips, options };