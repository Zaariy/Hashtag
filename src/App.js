import './App.css';
import SingUp from './components/SingUp.jsx' ;
import Login from './components/LogIn.jsx' ;
import MainPage from './components/Mainpage.jsx' ;
import {useEffect , useState} from 'react' ;
import {Routes , Route , BrowserRouter  } from 'react-router-dom' ;

function App() {
  const [session , setSession ] = useState(null);
  

  useEffect(() => {
      fetch('/route/session' , {method : 'POST'}).then((data) => data.json()).then((data) => setSession(data) )

  }, [])

  return (
      <BrowserRouter>
        <Routes>
        {
          session?.session ? (

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
