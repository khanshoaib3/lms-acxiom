import { BrowserRouter, Routes, Route } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from "./components/auth/SignUp"
import UserContext from "./contexts/UserContext"
import { useEffect, useState } from "react"
import SignIn from "./components/auth/SignIn"
import axios from "axios"
import Home from "./components/Home"
import Transactions from "./components/Transactions"
import Reports from "./components/Reports"
import Maintenance from "./components/Maintenance"
import AddBook from "./components/book/AddBook"

function App() {
  const [userData, setUserData] = useState({ token: undefined, data: undefined });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
        return;
      }
      console.log(token)
      const tokenResponse = await axios.post(
        "http://localhost:3000/auth/is-token-valid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:3000/auth/info", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token: token,
          data: {
            name: userRes.data.name,
            user_id: userRes.data.user_id,
            is_admin: userRes.data.is_admin
          }
        });
        console.log(userRes.data.is_admin)
      }
    };
    checkLoggedIn();
  }, []);
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/book/add" element={<AddBook />} />
            <Route path="/book/update" element={<AddBook />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
