import axios from "axios";
import { useState } from "react";

function SignUp() {
  const [password, setPassword] = useState();
  const [confirm_password, setConfirmPassword] = useState();
  const [user_id, setUsername] = useState();
  const [name, setName] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newUser = { password, confirm_password, user_id, name };
      const res = await axios.post("http://localhost:3000/auth/sign-up", newUser);

      console.log(res);

      alert(res.data.text)
      navigate("/sign-in")
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
                <td>Name: </td><td><input type="text" name="nm" id="nm" onChange={(e) => setName(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Password: </td><td><input type="password" name="pwd" id="pwd" onChange={(e) => setPassword(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Confirm Password: </td><td><input type="password" name="cnmpwd" id="cnmpwd" onChange={(e) => setConfirmPassword(e.target.value)} /></td>
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

export default SignUp;