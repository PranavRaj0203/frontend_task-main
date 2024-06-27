import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Form } from "antd";

const MainComponent = ({ users, setUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    // Fetch users from the API or other source
  }, []);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingUser({ ...record });
  };

  const validInput = (name, email) => {
    if (!name || !email) return false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSave = () => {
    if (validInput(editingUser.name, editingUser.email)) {
      setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
      setIsEditing(false);
      setEditingUser(null);
    } else {
      alert('Please enter a valid name and email.');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div id="main-container-wrapper">
      <Table dataSource={users} columns={columns} rowKey="id" />
      <Modal
        title="Edit User"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false);
          setEditingUser(null);
        }}
        onOk={handleSave}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={editingUser?.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={editingUser?.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MainComponent;
