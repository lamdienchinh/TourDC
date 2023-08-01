import "./loading.css"
const Loading = () => {
    return (
        <div class="loading__wrapper">
            <div class="loading__circle"></div>
            <div class="loading__circle"></div>
            <div class="loading__circle"></div>
            <div class="loading__shadow"></div>
            <div class="loading__shadow"></div>
            <div class="loading__shadow"></div>
            <span>Đang tải</span>
        </div>
    );
}
export default Loading