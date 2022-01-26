import react from 'react';
import{useNavigate} from 'react-router-dom';
//
function Logout(){
    let navigate=useNavigate();
    function logoutHandle(){
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    }
    return(
        <div>
            <button onClick={()=>{
                logoutHandle()
            }} className='logout-btn'>Logout</button>
        </div>
    )
}
export default Logout;