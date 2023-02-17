import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
// import { json } from "react-router-dom";

const BookRegistration = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("values" + JSON.stringify(values));

    axios
      .post("http://localhost:3000/Book/registration", values)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <h2>Book Registration Form</h2>
      <Form.Item
        label="Book Name"
        name="bookName"
        rules={[{ required: true, message: "Please enter the book name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Book ID"
        name="bookId"
        rules={[{ required: true, message: "Please enter the book ID" }]}
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
      </Form.Item>
    </Form>
  );
};

export default BookRegistration;


// give me a back end code for this form 
// in node json.
