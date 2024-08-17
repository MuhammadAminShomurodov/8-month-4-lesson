import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
import { HiChartPie } from "react-icons/hi";
import { FaUsers, FaUserCircle } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.svg";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menu = (
    <Menu style={{ padding: "16px" }}>
      <Menu.Item key="1" className="text-xl mb-2">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link
          to="/"
          className={`demo-logo-vertical flex items-center justify-center ${
            collapsed ? "p-2" : "p-5"
          }`}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: collapsed ? 40 : 80, height: "auto" }} // Adjust size based on collapse state
          />
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: (
                <Link to="/">
                  <HiChartPie size={20} />
                </Link>
              ),
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "2",
              icon: (
                <Link to="/users">
                  <FaUsers size={20} />
                </Link>
              ),
              label: <Link to="/users">Users</Link>,
            },
            {
              key: "3",
              icon: (
                <Link to="/products">
                  <AiOutlineProduct size={20} />
                </Link>
              ),
              label: <Link to="/products">Products</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-between"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown overlay={menu} trigger={["click"]} className="mr-5">
            <Space className="cursor-pointer">
              <FaUserCircle size={24} />
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
