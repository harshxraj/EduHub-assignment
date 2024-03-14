import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { MdAlternateEmail } from "react-icons/md";
import { Button, Checkbox, Form, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { SIGN_UP } from "../../graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { GET_COURSES } from "../../graphql/queries/course.query";

const Register = () => {
  const [value, setValue] = React.useState([]);
  const { data: courses, error: courseError } = useQuery(GET_COURSES);

  let optionsArr = courses?.courses?.map((course) => {
    return {
      // value will contain the ids of the course
      value: course._id,
      label: course.name,
      courseCode: course.courseCode,
      _id: course._id,
    };
  });
  console.log(optionsArr);

  const [signup, { loading, error }] = useMutation(SIGN_UP, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const onFinish = async (values) => {
    console.log(values);
    try {
      if (value.length < 3) {
        return toast.error("Please choose three courses!");
      }
      const { email, password, name } = values;
      await signup({
        variables: {
          input: { ...values, courses: value },
        },
      });
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const MAX_COUNT = 3;

  const suffix = (
    <>
      <span>
        {value.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );
  return (
    <div className="border flex items-center justify-center h-[100vh]">
      <Form
        name="normal_login"
        className="login-form  w-[900px] p-6 bg-gray-100"
        initialValues={{
          admin: false,
        }}
        onFinish={onFinish}
      >
        <h1 className="text-center text-4xl mb-5 font-semibold">Register</h1>

        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
            },
          ]}
        >
          <Input
            prefix={<MdAlternateEmail className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MdAlternateEmail className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
          <Form.Item name="admin" valuePropName="checked" noStyle>
            <Checkbox>Are you a admin?</Checkbox>
          </Form.Item>
        </Form.Item> */}
        <label className="text-base">Select Courses</label>
        <Select
          mode="multiple"
          maxCount={MAX_COUNT}
          value={value}
          style={{ width: "100%" }}
          onChange={setValue}
          suffixIcon={suffix}
          placeholder="Please select"
          className="mb-4"
          options={optionsArr}
        />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button bg-sky-600 text-white"
            disabled={loading}
          >
            {loading ? "Registering...." : "Register"}
          </Button>
          Or{" "}
          <Link to="/login" className="underline text-sky-600">
            Login now!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
