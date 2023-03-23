import './style.css'
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navigate = useNavigate();
 

  function handleLogout(){
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
      <div className="navbar p-4 pt-2 navbar-custom">
         
         <a class="navbar-brand" href="#">WordCounter</a>
         <div class="nav-bar-option ">         
           <p role="button" class="mb-0">Export Data</p> 
           <p onClick={handleLogout} role="button" class="mb-0">Logout</p> 
           <i class="fa-regular fa-xl fa-user user-icon"></i>           
         </div>

      </div>
    )
};

export default NavBar;