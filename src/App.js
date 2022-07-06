import './App.css';
import SingUp from './components/SingUp.jsx' ;
import Login from './components/LogIn.jsx' ;
import MainPage from './components/Mainpage.jsx' ;
import Profile from './components/Profile.jsx' ;
import SettingsProfile from './components/Settingsprofile.jsx' ;
import {useEffect , useState} from 'react' ;
import {Routes , Route , BrowserRouter  } from 'react-router-dom' ;

function App() {
  const [session , setSession ] = useState(false);
  

  useEffect(() => {

      fetch('/route/session' , {method : 'GET'}).then((data) => data.json()).then((data) => {
          if (data.session !== false) {
            setSession(data.session);
          }else {
            setSession(false)

          }
          
          if (data.session !== false) {
            sessionStorage.setItem('session' , data.session) ;
          }else {
            sessionStorage.clear();
          }
         
         
      })



  })

  return (
      <BrowserRouter>
        <Routes>
        {
          sessionStorage.getItem('session') || session !== false ? (
            // this route just for users have sesstion 
            // you can't access this route if you are not  
            // Sinup  
            <>
              <Route path='/home' element={<MainPage />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/edit-profile' element={<SettingsProfile />} />
            </>
            ) : (

            <Route path='*' element={ <Login /> }/>

            )
        }
          <Route path='/singup' element={<SingUp />} />

          <Route path='/' element={<Login />} />
          <Route path='/singin' element={<Login />} />
        </Routes>
      </BrowserRouter >


    )
}

export default App;
