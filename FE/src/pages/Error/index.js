import React from 'react';
import './css/Error.scss';

const Error = () => {
    return (
        <div className="error-page">
            <div className="text_group">
                <p className="text_404">404</p>
                <p className="text_lost">Trang bạn đang tìm kiếm<br />không tồn tại</p>
            </div>
            <div className="window_group">
                <div className="window_404">
                    <div className="stars">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;
