import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { Link, Navigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { Modal, Space, Input } from "antd";
import { RxDashboard } from "react-icons/rx";
import { PiStack } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";
import { GET_COURSES } from "../../graphql/queries/course.query";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setLecture, setRole } from "../../redux/user.slice";
import { GET_LECTURES } from "../../graphql/queries/lectures.query";

const Lectures = () => {
  const dispatch = useDispatch();
  const { data, error } = useQuery(GET_AUTHENTICATED_USER);
  if (data.authUser.role == "student") {
    dispatch(setRole("student"));
  } else {
    dispatch(setRole("admin"));
  }

  const user = useSelector((store) => store.user);
  console.log("USER SLICE", user);

  if (user?.role == "admin") {
    const { data: courses, error: courseError } = useQuery(GET_COURSES);
    const { data: lectures, error: lectureError } = useQuery(GET_LECTURES);
    dispatch(setCourse(courses?.courses));
    dispatch(setLecture(lectures?.lectures));
    console.log("admin coruses", courses);
  } else {
    const { data: courses, error: courseError } = useQuery(GET_COURSES);
    console.log("DATA", courses);
    dispatch(setCourse(courses?.courses?.user_courses));

    console.log(courses);
  }

  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
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
  const role = "admin";
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="h-[100vh]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
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
            <h1 className="text-3xl mr-4">Dashboard</h1>
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
          {role == "admin" && (
            <div className="">
              <Button
                className="bg-sky-600 flex items-center"
                type="primary"
                onClick={showModal}
              >
                <FaPlus className="mr-2" />
                Add a course
              </Button>
              <Modal
                title="Add a course"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={600}
              >
                <Space direction="vertical">
                  <div className="flex items-center">
                    <label className="mr-3 text-base">Course Name</label>
                    <Input className="rounded-md" />
                  </div>

                  <div className="flex items-center">
                    <label className="mr-3 text-base">Descriptions</label>
                    <Input className="rounded-md" />
                  </div>

                  <div className="flex items-center">
                    <label className="mr-3 text-base">Prerequisites</label>
                    <Input className="rounded-md" />
                  </div>

                  <div className="flex items-center">
                    <label className="mr-3 text-base">Courses</label>
                    <Input className="rounded-md w-[480px]" />
                  </div>
                </Space>
              </Modal>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Lectures;
