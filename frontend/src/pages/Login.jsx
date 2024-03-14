import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutations/user.mutation";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const onFinish = async (values) => {
    console.log(values);
    try {
      await login({
        variables: {
          input: values,
        },
      });
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };
  return (
    <div className="border flex flex-col items-center justify-center h-[100vh]">
      <Form
        name="normal_login"
        className="login-form border w-[900px] m-auto p-6 bg-gray-100"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h1 className="text-center text-4xl mb-5 font-semibold">Login</h1>
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
            prefix={<UserOutlined className="site-form-item-icon" />}
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

        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="login-form-button bg-sky-600 text-white"
            disabled={loading}
          >
            {loading ? "Logging in...." : "Log in"}
          </Button>
          Or{" "}
          <Link to="/register" className="underline text-sky-600">
            register now!
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
