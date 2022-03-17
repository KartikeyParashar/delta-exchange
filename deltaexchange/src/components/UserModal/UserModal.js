import React, { useEffect, useState } from "react";
import "./UserModal.css";

function UserModal(props) {
  const [userData, setUserData] = useState({
    name: "",
    company: "",
    status: "active",
    notes: "",
    last_updated: "",
  });

  useEffect(() => {
    let today = new Date();
    let date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    setUserData({
      ...userData,
      last_updated: date,
    });
  }, []);

  const validateFormHandler = () => {
    if (userData.name === "") {
      alert("Please write your name");
      return false;
    } else if (userData.company === "") {
      alert("Please write company name");
      return false;
    } else if (userData.notes === "") {
      alert("Notes field cannot be empty!");
      return false;
    }
    return true;
  };

  const onSaveDataHandler = async (e) => {
    e.preventDefault();
    if (validateFormHandler()) {
      props.addUserData(userData);
    }
  };

  const onCancelHandler = (e) => {
    e.preventDefault();
    props.toggleModal();
  };

  return (
    <>
      {props.modal && (
        <div className="modal">
          <div onClick={props.toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Add Members</h2>
            <form>
              <label htmlFor="name">Name</label>
              <br></br>
              <input
                type="text"
                id="name"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                value={userData.name}
              />
              <br></br>
              <br></br>
              <label htmlFor="company">Company</label>
              <br></br>
              <input
                type="text"
                id="company"
                onChange={(e) =>
                  setUserData({ ...userData, company: e.target.value })
                }
                value={userData.company}
              />
              <br></br>
              <br></br>
              <label htmlFor="status">Status</label>
              <br></br>
              <select
                id="status"
                value={userData.status}
                onChange={(e) =>
                  setUserData({ ...userData, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
              <br></br>
              <br></br>
              <label htmlFor="notes">Notes</label>
              <br></br>
              <input
                type="text"
                id="notes"
                value={userData.notes}
                onChange={(e) =>
                  setUserData({ ...userData, notes: e.target.value })
                }
              />
              <div className="buttons">
                <button className="cancel" onClick={onCancelHandler}>
                  Cancel
                </button>
                <button
                  className="success"
                  type="submit"
                  onClick={onSaveDataHandler}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UserModal;
