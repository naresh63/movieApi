import React from 'react';
import {Link} from 'react-router-dom';
import Logout from './Logout';
import UserProfile from './UserProfile';
// navbar
function Header(){

    return(
        <div className='nav'>
            <div>
            {/* i want to apply access to movies when login successful */}
            <ul>
                <li className="active"><Link to="/home" >Home</Link> </li>
                <li className="active"> <Link to="/movies">Movies</Link></li> 
                <li className="active"> <Link to="/contact">Contact</Link></li>
            </ul>
            </div>
             <div className='flex'>
                 <UserProfile/>
                 <Logout/>
             </div>
            
            
        </div>
    )
}
export default Header;