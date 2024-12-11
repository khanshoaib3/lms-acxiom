import axios from "axios";
import { useState, useContext } from "react";
import UserContext from "../../../context/UserContext";

function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUserData } = useContext(UserContext);


async function handleSubmit(e: { preventDefault: () => void; }) {
  e.preventDefault();
  setLoading(true);
  try {
    const newUser = { password, confirm_password, username };
    await axios.post("http://localhost:3000/auth/sign-up", newUser);
    const loginRes = await axios.post("http://localhost:3001/login", {
      email,
      password,
    });
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    localStorage.setItem("auth-token", loginRes.data.token);
    setLoading(false);
    history.push("/");
  } catch (err) {
    setLoading(false);
    err.response.data.msg && setError(err.response.data.msg);
  }
}

  return (
    <>
      <div id="outer">
        <h1>Sign UP</h1>
        <form onSubmit={handleSubmit}></form>
      </div>
    </>
  );
}
