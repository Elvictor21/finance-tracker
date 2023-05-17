
import './App.css';
import {Route,Routes} from 'react-router-dom';
import MoneyPage from './pages/MoneyPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './userContext';



function App() {
 return(
  <UserContextProvider>
      <Routes>
    <Route path='/index' element={<MoneyPage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/' element={<RegisterPage/>}/>

 </Routes>
 
 </UserContextProvider>
 );
}

export default App;
