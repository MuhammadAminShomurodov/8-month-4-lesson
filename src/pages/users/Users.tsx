import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Table, Button, message, Modal, Form, Input } from "antd";
import "antd/dist/reset.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get<User[]>(
          `http://localhost:3000/users?_page=${currentPage}&_limit=${itemsPerPage}`
        );
        setUsers(response.data);

        const totalCount = parseInt(response.headers["x-total-count"], 10) || 0;
        setTotal(totalCount);
      } catch (err: unknown) {
        setError("Failed to fetch users");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handleEdit = (user: User) => {
    setEditUser(user);
    editForm.setFieldsValue(user);
  };

  const handleDelete = (userId: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "Once deleted, this user cannot be recovered.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:3000/users/${userId}`);
          setUsers(users.filter((user) => user.id !== userId));
          message.success("User deleted successfully");
        } catch (err: unknown) {
          setError("Failed to delete user");
          console.error(err);
        }
      },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditSubmit = async (values: User) => {
    try {
      await axios.put(`http://localhost:3000/users/${values.id}`, values);
      setUsers(users.map((user) => (user.id === values.id ? values : user)));
      message.success("User updated successfully");
      setEditUser(null);
    } catch (err: unknown) {
      setError("Failed to update user");
      console.error(err);
    }
  };

  const handleAddSubmit = async (values: User) => {
    try {
      const response = await axios.post(`http://localhost:3000/users`, values);
      setUsers([...users, response.data]);
      message.success("User added successfully");
      setAddModalVisible(false);
    } catch (err: unknown) {
      setError("Failed to add user");
      console.error(err);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "index",
      key: "index",
      render: (_: unknown, __: unknown, index: number) =>
        (currentPage - 1) * itemsPerPage + index + 1,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, user: User) => (
        <span>
          <Button type="link" onClick={() => handleEdit(user)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(user.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <Button
        type="primary"
        className="mb-4"
        onClick={() => setAddModalVisible(true)}
      >
        Add User
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        pagination={false}
        rowKey="id"
      />
      <Pagination
        className="mt-4"
        current={currentPage}
        pageSize={itemsPerPage}
        total={total}
        onChange={handlePageChange}
        showSizeChanger={false}
      />

      <Modal
        title="Edit User"
        visible={!!editUser}
        onCancel={() => setEditUser(null)}
        onOk={() => editForm.submit()}
      >
        <Form
          form={editForm}
          onFinish={handleEditSubmit}
          initialValues={editUser || {}}
          layout="vertical"
        >
          <Form.Item name="id" label="ID" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add User"
        visible={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        onOk={() => addForm.submit()}
      >
        <Form form={addForm} onFinish={handleAddSubmit} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
