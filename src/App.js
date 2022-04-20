import './App.css'
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ResetPassword from './components/ResetPassword/ResetPassword'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/resetpassword/:token" element={<ResetPassword />}></Route>
      </Routes>      
    </Router>
  );
}

export default App;
