import React from "react";

import { Button, Container, ListGroup, Row } from "react-bootstrap";
import { IoIosMenu } from "react-icons/io";
import '../assets/css/style.css';

import { TfiMenu } from "react-icons/tfi";
import { IoLogOut, IoWallet } from "react-icons/io5";
import { GiWallet } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { useNavigate,Link} from 'react-router-dom';
import Dashboard from "./Dashboard/Dashboard";
import { MdOutlineHelp } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
 
// import profile from '../assets/image/bg.png'
 



const Header = () => {

  const { user,isAuthenticated,logout } = useAuth0();


const navigate=useNavigate()

// const logout = () => {
  
//   localStorage.removeItem('accessToken');
//   navigate('/');
// };
 



    return (
        <>
        <header className="main-header px5 container-fluid bg-dark">
                <Row className="justify-content-between align-items-center">
                <div className="w-auto">
                        <Button className="menu-hb " 
                        data-bs-toggle="offcanvas" data-bs-target="#rightSideMenu">
                        <TfiMenu />
                        </Button>
                    </div>
                    <div className="w-auto"><h3 style={{color:"white"}} onClick={()=>navigate("/admin")}>Admin Panel</h3></div>
                  {isAuthenticated ?  <div className="w-auto"><img  src={user.picture} alt="image" style={{width: "40px", height: "40px", borderRadius: "50%"}}/></div>:
                  
                  <div className="w-auto"><img  src="/img/bg.png" alt="image" style={{width: "40px", height: "40px", borderRadius: "50%"}}/></div>}
                    {/* <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button> */}
                </Row>
        </header>

        {/* Menu */}

        <div class="offcanvas offcanvas-start bg-dark rightSideMenuBar" tabindex="-1" id="rightSideMenu" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel"></h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <ListGroup as="ul">
   
        {/* <ListGroup.Item as="li">
        <a href="#" data-bs-dismiss="offcanvas" onClick={()=>{navigate("/help")} }><MdOutlineHelp /> Help & Support</a></ListGroup.Item> */}
        <ListGroup.Item as="li">
        <a href="#" data-bs-dismiss="offcanvas" onClick={logout}>< IoLogOut /> Logout</a></ListGroup.Item>
        
    </ListGroup>
  </div>
</div>

        {/* Menu End! */}
        </>
    )
}

export default Header;