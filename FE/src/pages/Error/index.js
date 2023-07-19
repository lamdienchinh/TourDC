import "./css/Error.scss";

const Error = () => {
    return (
        <div className="error-page">
            <div class="text_group">
                <p class="text_404">404</p>
                <p class="text_lost">Trang bạn đang tìm kiếm <br />không tồn tại</p>
            </div>
            <div class="window_group">
                <div class="window_404">
                    <div class="stars"></div>
                </div>
            </div>
        </div>
    );
}

export default Error;