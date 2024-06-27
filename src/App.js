import React, { useState, useEffect } from "react";
import "./assets/css/style.css";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import MainComponent from "./components/mainComponent";
import InputHandler from "./components/commonInput";
import { addUser as addUserAction, getUsers } from "./actions/userActions";

function App(props) {
  const [users, setUsers] = useState([]);

  const handleAddUser = ({ name, email }) => {
    if (validInput(name, email)) {
      const newUser = { name, email };
      setUsers([...users, newUser]);
      props.addUser(newUser);
    } else {
      alert('Please enter a valid name and email.');
    }
  };

  const validInput = (name, email) => {
    if (!name || !email) return false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  useEffect(() => {
    props.getUsers();
  }, [props]);

  return (
    <div>
      <InputHandler onSubmit={handleAddUser} />
      <MainComponent users={users} setUsers={setUsers}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = {
  getUsers,
  addUser: addUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
