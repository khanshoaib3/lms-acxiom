import axios from "axios";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [password, setPassword] = useState();
  const [user_id, setUsername] = useState();

  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = { password, user_id };
      const res = await axios.post("http://localhost:3000/auth/sign-in", user);
      const userRes = await axios.get("http://localhost:3000/auth/info", { headers: { "x-auth-token": res.data.token } });

      setUserData({
        token: res.data.token,
        data: {
          name: userRes.data.name,
          user_id: userRes.data.user_id,
          is_admin: userRes.data.is_admin
        }
      });

      localStorage.setItem("auth-token", res.data.token);

      navigate("/")
    } catch (err) {
      if (err.response.data.error) {
        alert(err.response.data.error)
        return;
      }
    }
  }

  return (
    <>
      <div id="outer">
        <h1>Sign UP</h1>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Username: </td><td><input type="text" name="unm" id="unm" onChange={(e) => setUsername(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Password: </td><td><input type="password" name="pwd" id="pwd" onChange={(e) => setPassword(e.target.value)} /></td>
              </tr>
              <tr>
                <td colSpan="2"><input type="submit" value="Submit" /></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
}

export default SignIn;