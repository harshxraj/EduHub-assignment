import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Layout, Menu, theme } from "antd";
import { Modal, Space, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { toast } from "react-hot-toast";
import { CREATE_COURSE } from "../../graphql/mutations/course.mutation";
import { useMutation } from "@apollo/client";

const { TextArea } = Input;

const AddCourse = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const role = "admin";
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [createCourse, { loading, error }] = useMutation(CREATE_COURSE);

  const [courseState, setCourseState] = useState({
    name: "",
    description: "",
    prerequisites: "",
    category: "",
    courseCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    if (
      !courseState.name ||
      !courseState.description ||
      !courseState.category ||
      !courseState.courseCode
    ) {
      return toast.error("Fill all the fields");
    }
    setConfirmLoading(true);
    console.log(courseState);
    try {
      const input = {
        name: courseState.name,
        description: courseState.description,
        category: courseState.category,
        prerequisites: courseState.prerequisites.split(","),
        courseCode: courseState.courseCode,
      };

      const { data } = await createCourse({
        variables: {
          input: input,
        },
      });

      console.log("Created course:", data.createCourse);
      setOpen(false);
      setConfirmLoading(false);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <div>
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
            okButtonProps={{
              style: { backgroundColor: "#1890ff", borderColor: "#1890ff" },
            }}
          >
            <>
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{
                  maxWidth: 600,
                }}
              >
                <Form.Item label="Course Name">
                  <Input
                    name="name"
                    value={courseState.name}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <TextArea
                    name="description"
                    value={courseState.description}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Prerequisite">
                  <Input
                    name="prerequisites"
                    value={courseState.prerequisites}
                    onChange={handleChange}
                    placeholder="Separate with commas"
                  />
                </Form.Item>
                <Form.Item label="Category">
                  <Input
                    name="category"
                    value={courseState.category}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Course Code">
                  <Input
                    name="courseCode"
                    value={courseState.courseCode}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Form>
            </>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
