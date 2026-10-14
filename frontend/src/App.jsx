import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Welcome from './pages/Welcome';
import Login from './pages/Login'
import Signup from "./pages/Signup";
import CoverPage from "./pages/CoverPage";
import Aura from "./components/Aura";

export default function App() {
  return (
    <BrowserRouter>
      <Aura />
      <div className="app-layer">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/app' element={<Main />}></Route>
          <Route path="/home" element={<CoverPage />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
