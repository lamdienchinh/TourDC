// import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import RouterList from './routers';
// import GetTouristInfor from './components/dapp/dapp';



function App() {
  return (
    // <div className="App">
    //   <GetTouristInfor />
    // </div>
    <BrowserRouter>
      <RouterList></RouterList>
    </BrowserRouter>
  );
  // /* <BrowserRouter>
  //   <getTouristInfor></getTouristInfor>

  // </BrowserRouter> */

}
export default App;
