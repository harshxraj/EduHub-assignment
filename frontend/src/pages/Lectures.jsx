import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { RxDashboard } from "react-icons/rx";
import { PiStack } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_COURSES,
  GET_COURSES,
} from "../../graphql/queries/course.query";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import { CiLogout } from "react-icons/ci";
import { GET_LECTURES } from "../../graphql/queries/lectures.query";
import LecturesCard from "../components/LecturesCard";
import AddLecture from "../components/AddLecture";

const Lectures = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: courses, error: courseError } = useQuery(GET_COURSES);
  const { data: lectures, error: lectureError } = useQuery(GET_LECTURES);
  const {
    loading: allCoursesLoading,
    error,
    data: allCourses,
  } = useQuery(GET_ALL_COURSES);
  console.log(allCourses);
  if (lectureError) return <p>Error: {lectureError.message}</p>;
  console.log("lectures", lectures);

  const [logout, { loading }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="h-[100vh]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["3"]}>
          <Menu.Item key="1" icon={<RxDashboard />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PiStack />}>
            <Link to="/courses">Courses</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<VideoCameraOutlined />}>
            <Link to="/lectures">Lectures</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<CiLogout />} onClick={handleLogout}>
            <h1>Logout</h1>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex items-center">
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
            <div className="flex items-center">
              <h1 className="text-3xl font-medium mr-5 pb-2">Lecture</h1>
              <AddLecture />
            </div>
          </div>
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
          {" "}
          <div className="flex flex-col gap-3">
            {lectures &&
              lectures?.lectures?.map((lecture) => {
                return <LecturesCard {...lecture} key={lecture._id} />;
              })}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Lectures;
