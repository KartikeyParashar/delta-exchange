import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ userName: "", password: "" });

  const history = useHistory();

  const validateData = (userEntries, userName, password) => {
    for (let loggedInUserDetail of userEntries) {
      if (
        loggedInUserDetail[1].userName === userName &&
        loggedInUserDetail[1].password === password
      ) {
        return true;
      }
    }
    return false;
  };

  const getDataFromFirebaseAPI = async () => {
    const response = await fetch(
      "https://deltaexchange-9c92f-default-rtdb.firebaseio.com/users.json",
      { method: "GET" }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return response;
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (formData.userName === "") {
      alert("User Name cannot be empty!");
    } else if (formData.password === "") {
      alert("Password Name cannot be empty!");
    } else {
      const response = await getDataFromFirebaseAPI();
      const isUserPresent = validateData(
        Object.entries(response),
        formData.userName,
        formData.password
      );
      if (isUserPresent) {
        console.log("Logged In Successfully!");
        localStorage.setItem("username", formData.userName);
        localStorage.setItem("password", formData.password);
        history.push("/");
      } else {
        alert("Incorrect Username or Password");
      }
    }
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <form>
        <div className="txt_field">
          <input
            type="text"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            required
          />
          <span></span>
          <label>Username</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Login" onClick={formHandler} />
        <div className="signup_link">
          Not a member? <NavLink to="/signup">Signup</NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
