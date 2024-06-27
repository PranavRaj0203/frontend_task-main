import React, { useState } from "react";
import { Button, Input } from "antd";

const InputHandler = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please enter a valid name and email.');
      return;
    }
    onSubmit({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <form className="header-box" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <Button type="primary" htmlType="submit">Add user</Button>
    </form>
  );
};

export default InputHandler;
