import './App.css';
import{BrowserRouter as Router,
Routes,
Route,
Navigate
} from 'react-router-dom';
import Home from './components/Home'
import Movies from './components/Movies'
import Contact from './components/Contact'
import Signup from './components/Signup'
import Login from './components/Login'
import Logo from './components/Logo';
import Footer from './components/Footer';

//function for procting route
function RequiredAuth({children,redirectTo}){
  let isAuth = localStorage.getItem("token");
  if(isAuth!=null){
     return children;
  }else{
    return <Navigate to={redirectTo}/>
  }
}

const App=()=> {
  return (
     <div>
       <Logo/>
       <div className='content'>
       <Router>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/movies" element={
              <RequiredAuth>
                <Movies/>
              </RequiredAuth> 
            }/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<Navigate to="/"/>} />
          </Routes>
       </Router>
       </div>
       <Footer/>
     </div>
  );
}
export default App;
