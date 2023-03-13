import React from "react";
import { Form, Input, Button } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { registerStudent } from "./apis.js";
import { NotificationService } from "./notificationService.js";

const StudentRegistration = () => {
  const [form] = Form.useForm();
  const notification = new NotificationService();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    registerStudent(values)
      .then((response) => {
        if (response.status === 200 && response.data.message) {
          notification.errorNotification("Student id already exist");
        } else {
          notification.successNotification("Student has been registred");
          form.resetFields();
        }
      })
      .catch((error) => {
        notification.errorNotification("Failed to register");
      });
  };

  const navigateToDetails = () => {
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "800px" }}>
        <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
          Student Registration Form
        </h2>
        <Form
          form={form}
          onFinish={onFinish}
          validateTrigger="onSubmit"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Student Name"
            name="studentname"
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
            name="studentid"
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
            <Toaster />
            <Button
              type="primary"
              onClick={navigateToDetails}
              style={{ marginLeft: "1rem" }}
            >
              back
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default StudentRegistration;
