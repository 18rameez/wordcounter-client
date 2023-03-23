import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoute/>}>
             <Route element={<Home/>} path="/" exact/>
          </Route>
          <Route element={<Login/>} path="/login" />
          <Route element={<Signup/>} path="/signup" />
        </Routes>
       
      </Router>
    </div>
  );
}

export default App;
