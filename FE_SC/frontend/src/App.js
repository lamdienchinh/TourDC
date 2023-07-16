// import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import RouterList from './routers';
import {GetTouristInfor, ConnectWallet} from './components/dapp/dapp';
import {TicketForm} from './components/dapp/checkIn.js'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    // <div className="App">
    //   <GetTouristInfor />
    //   <ConnectWallet />
    //   <TicketForm />
    // </div>
    <BrowserRouter>
      <RouterList></RouterList>
    </BrowserRouter>
  );
}
export default App;
