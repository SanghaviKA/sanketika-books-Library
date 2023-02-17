import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

const StudentRegistration = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    axios
      .post("http://localhost:3000/student/registration", values)
      .then((response) => {
        console.log("Response from server:", response.data);
      })
      .catch((error) => {
        console.error("Error sending request:", error);
      });
  };

  return (
    <div>
      <h2>Student Registration Form</h2>
      <Form
        onFinish={onFinish}
        validateTrigger="onSubmit"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Student Name"
          name="studentName"
          rules={[
            {
              required: true,
              message: "Please input your student name!",
            },
          ]}
        >
          <Input placeholder="Enter student name" />
        </Form.Item>
        <Form.Item
          label="Student Id"
          name="studentId"
          rules={[
            {
              required: true,
              message: "Please input your student id!",
            },
          ]}
        >
          <Input placeholder="Enter student id" />
        </Form.Item>
        <Form.Item
          label="Branch"
          name="branch"
          rules={[
            {
              required: true,
              message: "Please input your branch!",
            },
          ]}
        >
          <Input placeholder="Enter branch" />
        </Form.Item>
        <Form.Item
          label="Semester"
          name="semester"
          rules={[
            {
              required: true,
              message: "Please input your semester!",
            },
          ]}
        >
          <Input placeholder="Enter semester" />
        </Form.Item>
        <br />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StudentRegistration;
