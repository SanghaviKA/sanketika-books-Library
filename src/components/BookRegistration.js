import React from "react";
import { Form, Input, Button } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { registerBook } from "./apis.js";
import { NotificationService } from "./notificationService.js";

const BookRegistration = () => {
  const [form] = Form.useForm();
  const notification = new NotificationService();

  const onFinish = (values) => {
    console.log("values", values);

    registerBook(values)
      .then((response) => {
        notification.successNotification("book as been registered");
        form.resetFields();
      })
      .catch((error) => {
        notification.errorNotification("failed to register");
      });
  };

  const handleFormSubmit = (formData) => {
    console.log(formData);
  };

  const navigateToDetails = () => {
    window.location.href = "/";
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      <div style={{ width: "700px" }}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit(e.target);
          }}
          form={form}
          onFinish={onFinish}
          layout="horizontal"
        >
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
            Book Registration Form
          </h2>
          <Form.Item
            label="Book Name"
            name="bookname"
            rules={[{ required: true, message: "Please enter the book name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Branch"
            name="branch"
            rules={[{ required: true, message: "Please enter the branch" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Semester"
            name="semester"
            rules={[{ required: true, message: "Please enter the semester" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Toaster />
            <Button
              type="primary"
              onClick={navigateToDetails}
              htmlType="submit"
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
export default BookRegistration;
