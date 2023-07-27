import { useState, useEffect } from "react";
import "./css/Code.scss";
import { checkIn } from "../../components/dapp/checkIn";
import { checkValidTicket } from "../../components/dapp/checkValidTicket";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getUserData, getInfor } from "../../state/selectors";
import { autoCheckIn } from "../../service/api";

const Code = () => {
    const [input, setInput] = useState();
    const [placeId, setPlaceId] = useState();
    const [currentAccount] = useState(useSelector(getUserData));
    const user = useSelector(getInfor);
    // setCurrentAccount()
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
    }, []);

    const handleChange = (content) => {
        setInput(content);
    }
    const submitCode = async () => {
        console.log(input)
        await checkValidTicket(input)
        .then((result)=>{
            console.log("result: ", result);
            if(result) {
              if (!user.privateKey) {
                toast.promise(
                  checkIn(currentAccount, input, placeId),
                  {
                    pending: 'Đang đợi xử lí',
                    success: 'Check-in thành công !',
                    error: (error) => {
                      // Xử lý thông báo lỗi dựa trên các điều kiện khác nhau
                      if (error.code === 4001) {
                        return 'Người dùng từ chối';
                      } else {
                        return 'Đã xảy ra lỗi 🤯';
                      }
                     }
                  }
              )
              } else {
                console.log("hello")
                autoCheckIn(user, input, placeId)
              }
            } else {
                toast.error('Ticket not avaiable or used!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });;
            }
        })
        .catch((error) => console.error("error: ", error));
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
            
            {/* Same as */}
           
        </section>
        
    );
}

export default Code;