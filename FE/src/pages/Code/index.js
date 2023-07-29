import { useState, useEffect } from "react";
import "./css/Code.scss";
import { checkIn } from "../../components/dapp/checkIn";
import { checkValidTicket } from "../../components/dapp/checkValidTicket";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getUserData, getInfor } from "../../state/selectors";
import { autoCheckIn } from "../../service/api";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";

const Code = () => {
  const user = useSelector(getInfor)
  const [input, setInput] = useState();
  const [placeId, setPlaceId] = useState();
  const [currentAccount] = useState(useSelector(getUserData));
  const [show, setShow] = useState(false);
  const [checkInHash, setCheckInHash] = useState('')
 
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
    let validTicket = await checkValidTicket(input);
    if (validTicket) {
      if (!user.privateKey) {
        try {
          let txHash = await checkIn(currentAccount, input, placeId);
          if (txHash) {
            // console.log(txHash)
            setCheckInHash(txHash)
            setShow(true)
          } else {
            toast.error('Check in thất bại', {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
          })
        }
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          let txHash = await autoCheckIn(user, input, placeId);
          if (txHash) {
            setCheckInHash(txHash);
            setShow(true);
          }
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      toast.error('Vé đã được sử dụng!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
    }
    // await checkValidTicket(input)
    //   .then((result) => {
    //     console.log("result: ", result);
    //     if (result) {
    //       if (!user.privateKey) {
    //         toast.promise(
    //           checkInHash = checkIn(currentAccount, input, placeId),
    //           {
    //             pending: 'Đang đợi xử lí',
    //             success: 'Check-in thành công !',
    //             error: ((error) => {
    //               // Xử lý thông báo lỗi dựa trên các điều kiện khác nhau
    //               if (error.code === 4001) {
    //                 return 'Người dùng từ chối';
    //               } else {
    //                 return 'Đã xảy ra lỗi 🤯';
    //               }
    //             })
    //           }
    //         )
    //         try {
              
    //         } catch (error) {
              
    //         }
    //         console.log(checkInHash);
    //       } else {
    //         checkInHash = autoCheckIn(user, input, placeId);
    //       }
    //     } else {
    //       toast.error('Ticket not avaiable or used!', {
    //         position: "bottom-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //       });;
    //     }
    //   })
    //   .catch((error) => console.error("error: ", error));
  }
  const handleClose = () => setShow(false);
  return (
    <div>
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    size="lg"
    > 
        <Modal.Header closeButton>
        <Modal.Title>Check in thành công ! </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{fontWeight: "bold",margin:"10px"}}>
            Nhấn vào mã sau để xem thông tin check in của bạn trên Blockchain: 
        </div>
        
        <div style={{textDecoration: "underline", fontWeight: "bold", display: "flex", justifyContent: "center", marginBottom: "5px"}}>Transaction hash: </div>
        <div  style={{color: "red",margin:"10px", border: "0.1px solid black", padding: "10px"}}><a href={`https://sepolia.etherscan.io/tx/${checkInHash}`}>{checkInHash}</a></div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Link to="/trips"><Button variant="primary">Đã hiểu</Button></Link>
        </Modal.Footer>
    </Modal>
    <section className="code-page">

      <div className="code-wrapper">
        <h1 style={{color: "black", fontFamily: "'Roboto', sans-serif", fontWeight: '700'}}>Nhập mã vé để xác thực</h1>
        <div className="code-box">
          <input className="code" placeholder="Nhập mã vé ở đây" onChange={(event) => handleChange(event.target.value)}></input>
        </div>
        <button className="code-btn" onClick={() => submitCode()}>Kiểm tra</button>
      </div>

      {/* Same as */}

    </section>
  </div>
  );
}

export default Code;