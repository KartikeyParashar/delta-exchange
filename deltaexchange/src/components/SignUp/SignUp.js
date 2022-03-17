import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });

  const history = useHistory();

  const validateData = (userEntries) => {
    for ( let registeredUserDetail of userEntries ) {
      if (registeredUserDetail[1].userName === formData.userName) {
        alert("Username already exists!");
        return false;
      }
    }
    return true;
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (formData.firstName === "") {
      alert("First Name cannot be empty!");
    } else if (formData.lastName === "") {
      alert("Last Name cannot be empty!");
    } else if (formData.userName === "") {
      alert("User Name cannot be empty!");
    } else if (formData.password === "") {
      alert("Password Name cannot be empty!");
    } else if (formData.userName.length < 6) {
      alert("Username should have atleast 6 characters");
    } else if (formData.password < 6) {
      alert("Password should have atleast 6 characters");
    } else {
      const response = await fetch(
        "https://deltaexchange-9c92f-default-rtdb.firebaseio.com/users.json",
        { method: "GET" }
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));
      const isUserNotPresent = validateData(Object.entries(response));
      if (isUserNotPresent) {
        saveFormDataToFirebase(formData);
      }
      // console.log(Object.entries(response));
    }
  };

  const saveFormDataToFirebase = async (formData) => {
    try {
      const response = await fetch(
        "https://deltaexchange-9c92f-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("Registered Successfully!");
      history.push("/login");
    } catch {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="center">
      <h1>SignUp</h1>
      <form>
        <div className="txt_field">
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <span></span>
          <label>First Name</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <span></span>
          <label>Last Name</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            required
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
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
        <input type="submit" value="SignUp" onClick={formHandler} />
        <br></br>
        <br></br>
      </form>
    </div>
  );
}

export default SignUp;
