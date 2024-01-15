import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Page404 from './components/404page';
import Protected from './components/admin/Protected';
import Admin from './components/admin/Admin';
import Doctor from './components/admin/Doctor';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/admin' element={<Protected Comp={Admin}/>}/>
      <Route path='/*' element={<Page404/>}/>
      <Route path="/doctor/*"   element={<Protected Comp={Doctor} />}/>
      <Route path="/doctor"   element={<Protected Comp={Doctor} />} />
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Protected Comp={Login} />}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
