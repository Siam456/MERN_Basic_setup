import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRouter from "./components/login/PrivateRouter";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "./utils/toast";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRouter />}>
            <Route path="*" element={<Layout />} />
          </Route>

          {/* <Route path="/" element={<HomePage />} /> */}
          {/* <Route path="/" element={<QrGeneraator />} /> */}

          {/* <Route element={<PrivateRouter />}>
            <Route path="/homepage" element={<HomePage />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
