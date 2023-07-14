import { useState } from "react";
import "./css/Code.scss"
const Code = () => {
    const [input, setInput] = useState();
    const handleChange = (content) => {
        setInput(content);
    }
    const submitCode = () => {
        console.log(input)
    }
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