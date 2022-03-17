import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import Table from "../Table/Table";

function Home() {
  const [fullName, setFullName] = useState("");
  const history = useHistory();

  const validateData = (userEntries, userName, password) => {
    for (let loggedInUserDetail of userEntries) {
      if (
        loggedInUserDetail[1].userName === userName &&
        loggedInUserDetail[1].password === password
      ) {
        setFullName(`${loggedInUserDetail[1].firstName}`);
        return true;
      }
    }
    return false;
  };

  const getUserDataFromFirebaseAPI = async () => {
    const response = await fetch(
      "https://deltaexchange-9c92f-default-rtdb.firebaseio.com/users.json",
      { method: "GET" }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return response;
  };

  useEffect(async () => {
    if (localStorage.getItem("username") && localStorage.getItem("password")) {
      const response = await getUserDataFromFirebaseAPI();
      const isUserPresent = validateData(
        Object.entries(response),
        localStorage.getItem("username"),
        localStorage.getItem("password")
      );
      if (!isUserPresent) {
        history.push("/login");
      }
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <Navbar fullName={fullName} />
      <Table />
    </>
  );
}

export default Home;
