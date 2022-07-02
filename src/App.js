import './App.css';
import SingUp from './components/SingUp.jsx' ;
import Login from './components/LogIn.jsx' ;
import MainPage from './components/Mainpage.jsx' ;
import {useEffect , useState} from 'react' ;
import {Routes , Route , BrowserRouter  } from 'react-router-dom' ;

function App() {
  const [session , setSession ] = useState(false);
  

  useEffect(() => {

      fetch('/route/session' , {method : 'POST'}).then((data) => data.json()).then((data) => {
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
         
          console.log(sessionStorage.getItem('session'))
      })



  })

  return (
      <BrowserRouter>
        <Routes>
        {
          sessionStorage.getItem('session') || session !== false ? (

              <Route path='/home' element={<MainPage />} />

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
