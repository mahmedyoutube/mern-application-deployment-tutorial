import "./App.css";
import axios from "axios";
import { useState, useCallback, useEffect } from "react";

const deleteBtnStyle = {
  fontSize: 12,
  color: "red",
  marginLeft: 10,
  cursor: "pointer",
};

function App() {
  const [name, setName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  console.log(
    "backendUrl ",
    process.env.REACT_APP_BACKEND_URL
  );

  const loadAllUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/all`);
      setAllUsers(data);
    } catch (err) {}
  }, []);

  useEffect(() => {
    loadAllUsers();
  }, [loadAllUsers]);

  const submitForm = async () => {
    if (!name) return;

    try {
      const { data } = await axios.post(`${backendUrl}/new-user`, { name });
      console.log("data is = ", data);
      setAllUsers([...allUsers, data]);
    } catch (err) {}
  };

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/user/${id}`);
      const remainingUsers = allUsers.filter((user) => user._id !== id);
      setAllUsers(remainingUsers);
    } catch (err) {}
  };

  const onChange = (e) => setName(e.target.value);

  return (
    <div className="App">
      <h2>Simple Users List</h2>
      <br />
      {allUsers.map((user, index) => (
        <div key={user._id} style={{ margin: "5px 0" }}>
          <h3>
            {" "}
            {index + 1}- &nbsp;{user.name}
            <span
              style={deleteBtnStyle}
              onClick={() => {
                deleteUser(user._id);
              }}
            >
              Delete
            </span>
          </h3>
        </div>
      ))}
      <input
        type="text"
        value={name}
        name="name"
        onChange={onChange}
        placeholder="enter your name here"
      />
      <button onClick={submitForm}>Submit form</button>
    </div>
  );
}

export default App;
