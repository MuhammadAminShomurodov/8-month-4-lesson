import React from "react";
import { Form, Input, Button, Card, notification } from "antd";
import "antd/dist/reset.css";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: { username: string; password: string }) => {
    console.log("Login values:", values);
    notification.success({
      message: "Login Successful",
      description: "You have successfully logged in.",
    });
  };

  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card title="Login" style={{ width: 300 }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
