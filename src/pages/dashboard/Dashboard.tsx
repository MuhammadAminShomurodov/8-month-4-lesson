import React from "react";
import { Card, Col, Row, Statistic, Progress } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "antd/dist/reset.css";

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 2000 },
  { name: "Apr", revenue: 2780 },
  { name: "May", revenue: 1890 },
  { name: "Jun", revenue: 2390 },
  { name: "Jul", revenue: 3490 },
];

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: "24px", backgroundColor: "#f0f2f5" }}>
      <h1
        style={{ marginBottom: "24px", fontSize: "24px", fontWeight: "bold" }}
      >
        Dashboard
      </h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            bordered={false}
            style={{ backgroundColor: "#fff", textAlign: "center" }}
          >
            <Statistic
              title="Total Users"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
            <Progress
              type="circle"
              percent={75}
              format={() => "75%"}
              strokeColor="#3f8600"
              style={{ marginTop: "16px" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            style={{ backgroundColor: "#fff", textAlign: "center" }}
          >
            <Statistic
              title="Total Orders"
              value={234}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
            <Progress
              type="circle"
              percent={60}
              format={() => "60%"}
              strokeColor="#cf1322"
              style={{ marginTop: "16px" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            style={{ backgroundColor: "#fff", textAlign: "center" }}
          >
            <Statistic
              title="Total Revenue"
              value={124560}
              prefix={<DollarOutlined />}
              suffix="$"
              valueStyle={{ color: "#1890ff" }}
            />
            <Progress
              type="circle"
              percent={85}
              format={() => "85%"}
              strokeColor="#1890ff"
              style={{ marginTop: "16px" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            style={{ backgroundColor: "#fff", textAlign: "center" }}
          >
            <Statistic
              title="New Reports"
              value={78}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
            <Progress
              type="circle"
              percent={50}
              format={() => "50%"}
              strokeColor="#faad14"
              style={{ marginTop: "16px" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Revenue Over Time Chart */}
      <Row gutter={16} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card
            title="Revenue Over Time"
            bordered={false}
            style={{ backgroundColor: "#fff" }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1890ff"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
