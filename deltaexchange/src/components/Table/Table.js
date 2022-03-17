import React, { useEffect, useState } from "react";
import UserModal from "../UserModal/UserModal";
import "./Table.css";

function Table() {
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const filterByStatus = async (status) => {
    setStatus(status);
    const data = await fetchTableDataFromFirebase();
    const dataInArray = Object.entries(data);
    if (status === "active") {
      setTableData(dataInArray.filter((arr) => arr[1].status === "active"));
    } else if (status === "closed") {
      setTableData(dataInArray.filter((arr) => arr[1].status === "closed"));
    } else {
      setTableData(dataInArray);
    }
  };

  const fetchTableDataFromFirebase = async () => {
    const response = await fetch(
      "https://deltaexchange-9c92f-default-rtdb.firebaseio.com/teamMembers.json",
      { method: "GET" }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
    return response;
  };

  const addUserDataToFirebase = async (data) => {
    await fetch(
      "https://deltaexchange-9c92f-default-rtdb.firebaseio.com/teamMembers.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (res) => {
        const newUserEntry = await fetchTableDataFromFirebase();
        setTableData(Object.entries(newUserEntry));
        toggleModal();
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  const deleteEntryFromTable = async (id) => {
    await fetch(
      `https://deltaexchange-9c92f-default-rtdb.firebaseio.com/teamMembers/${id}.json`,
      { method: "DELETE" }
    )
      .then(async (res) => {
        const newUserEntry = await fetchTableDataFromFirebase();
        setTableData(Object.entries(newUserEntry));
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  useEffect(async () => {
    const res = await fetchTableDataFromFirebase();
    setTableData(Object.entries(res));
  }, []);

  return (
    <div className="table-container">
      <div className="title">
        <h1>Team Members</h1>
        <button onClick={toggleModal}>Add Members</button>
      </div>
      <select value={status} onChange={(e) => filterByStatus(e.target.value)}>
        <option value="">Status</option>
        <option value="active">Active</option>
        <option value="closed">Closed</option>
      </select>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data[0]}>
              <td>{data[1].name}</td>
              <td>{data[1].company}</td>
              <td>{data[1].status}</td>
              <td>{data[1].last_updated}</td>
              <td>{data[1].notes}</td>
              <td
                className="delete"
                onClick={() => deleteEntryFromTable(data[0])}
              >
                DELETE
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModal
        modal={modal}
        toggleModal={toggleModal}
        addUserData={addUserDataToFirebase}
      />
    </div>
  );
}

export default Table;
