import './App.css';
import SingUp from './components/SingUp.jsx' ;
import Login from './components/LogIn.jsx' ;
import MainPage from './components/Mainpage.jsx' ;
import {Routes , Route , BrowserRouter} from 'react-router-dom' ;

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/singup' element={<SingUp />} />
          <Route path='/singin' element={<Login />} />
        </Routes>
      </BrowserRouter >


    )
}

export default App;
