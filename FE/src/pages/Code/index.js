import { useState, useEffect } from "react";
import "./css/Code.scss"
const Code = () => {
    const [input, setInput] = useState();
    const [setPlaceId] = useState();
    const handleChange = (content) => {
        setInput(content);
    }
    const submitCode = () => {
        console.log(input)
    }
    useEffect(() => {
        // Lấy đường link hiện tại
        const url = new URL(window.location.href);
    
        // Lấy các tham số từ đường link
        const searchParams = new URLSearchParams(url.search);
    
        // Lấy giá trị của tham số "id"
        const id = searchParams.get('id');
        console.log(id); // In ra id
    
        // Tiếp tục xử lý với giá trị id
        // ...
        setPlaceId(id)
      }, [setPlaceId]);
      
    return (
        <section className="code-page">
            <div className="code-wrapper">
                <h1>Nhập mã vé để xác nhận checkin</h1>
                <div className="code-box">
                    <input className="code" placeholder="Nhập mã vé ở đây" onChange={(event) => handleChange(event.target.value)}></input>
                </div>
                <button className="code-btn" onClick={() => submitCode()}>Kiểm tra</button>
            </div>
        </section>
    );
}

export default Code;