import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { CiLogout } from "react-icons/ci";

import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { PiStack } from "react-icons/pi";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COURSES } from "../../graphql/queries/course.query";
import CourseCard from "../components/CourseCard";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import AddCourse from "../components/AddCourse";
import useSelection from "antd/es/table/hooks/useSelection";
import { useSelector } from "react-redux";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";

const Courses = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: courses, error: courseError } = useQuery(GET_COURSES);
  const coursesFromStore = useSelector((store) => store.user.courses);
  console.log("coursesFromStore", coursesFromStore);
  // const role = useSelector((store) => store.user.role);
  const {
    loading: authLoading,
    data,
    error,
  } = useQuery(GET_AUTHENTICATED_USER);

  const role = data?.authUser?.role;
  console.log(role);

  console.log(courses);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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

  return (
    <Layout className="h-full">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
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
              <h1 className="text-3xl font-medium mr-5 pb-2">Courses</h1>
              <AddCourse />
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {role === "student" ? (
            <h1 className="text-3xl italic mb-3">Your Courses</h1>
          ) : (
            <h1 className="text-3xl italic mb-3">All Courses</h1>
          )}

          <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2">
            {courses &&
              courses.courses.map((course) => {
                return <CourseCard {...course} key={course._id} />;
              })}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Courses;
