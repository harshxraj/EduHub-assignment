import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Layout, Menu, theme } from "antd";
import { Modal, Space, Input, TimePicker, DatePicker, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import { toast } from "react-hot-toast";
import { CREATE_COURSE } from "../../graphql/mutations/course.mutation";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_COURSES,
  GET_COURSES,
} from "../../graphql/queries/course.query";
import { CREATE_LECTURE } from "../../graphql/mutations/lecture.mutation";

const { TextArea } = Input;

const AddLecture = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const role = "admin";
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data: courses, error: courseError } = useQuery(GET_COURSES);
  const [createCourse, { loading, error }] = useMutation(CREATE_COURSE);
  const {
    loading: allCoursesLoading,
    error: allCoursesError,
    data: allCourses,
  } = useQuery(GET_ALL_COURSES);
  const [
    createLectureMutation,
    { loading: createLectureLoading, error: createLectureError },
  ] = useMutation(CREATE_LECTURE);

  const optionsArr = allCourses?.allCourses?.map((course) => ({
    value: course._id,
    label: course.courseCode,
  }));

  const [lectureState, setLectureState] = useState({
    name: "",
    description: "",
    date: "",
    start_time: "",
    end_time: "",
    course_code: "",
    course_name: "",
    zoom_link: "",
  });

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setLectureState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCourseChange = (value) => {
    const selectedCourse = optionsArr.find((course) => course.value === value);
    if (selectedCourse) {
      setLectureState((prevState) => ({
        ...prevState,
        course_code: value,
        course_name: selectedCourse.label,
      }));
    }
  };

  const onDateChange = (date, dateString) => {
    setLectureState((prevState) => ({
      ...prevState,
      date: dateString,
    }));
  };

  const onTimeChange = (date, dateString) => {
    setLectureState((prevState) => ({
      ...prevState,
      start_time: dateString[0],
      end_time: dateString[1],
    }));
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    console.log(lectureState);
    try {
      const { data } = await createLectureMutation({
        variables: {
          input: lectureState,
        },
      });
      console.log("Created lecture:", data.createLecture);
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
            Add a Lecture
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
                <Form.Item label="Lecture Name">
                  <Input
                    name="name"
                    value={lectureState.name}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <TextArea
                    name="description"
                    value={lectureState.description}
                    onChange={handleChange}
                  />
                </Form.Item>

                <Form.Item label="Course Name">
                  <Select
                    defaultValue="Course"
                    style={{
                      width: 120,
                    }}
                    name="course_code"
                    onChange={handleCourseChange}
                    options={optionsArr}
                    value={lectureState.course_code}
                  />
                </Form.Item>

                <Form.Item label="Lecture Date">
                  <DatePicker name="date" onChange={onDateChange} />
                </Form.Item>

                <Form.Item label="Lecture Time">
                  <TimePicker.RangePicker
                    use12Hours
                    format="h:mm a"
                    onChange={onTimeChange}
                  />
                </Form.Item>

                <Form.Item label="Zoom link">
                  <Input
                    name="zoom_link"
                    value={lectureState.zoom_link}
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

export default AddLecture;
