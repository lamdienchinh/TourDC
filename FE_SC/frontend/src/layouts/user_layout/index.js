import { Outlet } from "react-router-dom";
// import Sidebar from "../sidebar";
import Header from "../header";
import Footer from "../footer";
import Fireflies from "../../components/fireflies";
import "./css/UserLayout.scss";

const UserLayout = () => {
    return (
        <div className="userlayout">
            <Fireflies />
            <Header></Header>
            <div className="userlayout__body">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default UserLayout;