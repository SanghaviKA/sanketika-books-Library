import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const BooksForm = () => {
  const [form] = Form.useForm();
  const [selectedAction, setSelectedAction] = useState("");

  const handleActionChange = (value) => {

    setSelectedAction(value);
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleSubmit = (values) => {
    axios
      .post("http://localhost:3000/Actions/details", values)
      .then((response) => {
        console.log("Form values submitted: ", response.data);
        handleReset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleSubmit = (values) => {
  //   console.log("Form values: ", values);
  // };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <h2>Book Assigning Process</h2>

      <Form.Item
        label="Book ID"
        name="bookId"
        rules={[{ required: true, message: "Please enter Book ID" }]}
      >
        <Input placeholder="Enter Book ID" />
      </Form.Item>
      <Form.Item
        label="Student ID"
        name="studentId"
        rules={[{ required: true, message: "Please enter Student ID" }]}
      >
        <Input placeholder="Enter Student ID" />
      </Form.Item>
      <Form.Item
        label="Book Assigned Date"
        name="assignedDate"
        rules={[{ required: true, message: "Please select a date" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="No. of Days"
        name="numberOfDays"
        rules={[{ required: true, message: "Please enter number of days" }]}
      >
        <Input type="number" min={1} />
      </Form.Item>
      <Form.Item
        label="Action"
        name="action"
        rules={[{ required: true, message: "Please select an action" }]}
      >
        <Select onChange={handleActionChange}>
          <Option value="">Select an option</Option>
          <Option value="return">Return</Option>
          <Option value="renewal">Renewal</Option>
        </Select>
      </Form.Item>
      {selectedAction === "return" && (
        <Form.Item
          label="Return Date"
          name="return"
          rules={[{ required: true, message: "Please enter return date" }]}
        >
          <DatePicker />
        </Form.Item>
      )}
      <Form.Item
        label=" Days to be extended"
        name="numberDays"
        rules={[
          {
            required: selectedAction === "renewal",
            message: "Please enter number of days",
          },
        ]}
        style={{ display: selectedAction !== "renewal" ? "none" : "block" }}
      >
        <Input type="number" min={1} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button
          type="primary"
          htmlType="button"
          onClick={handleReset}
          style={{ marginLeft: "1rem" }}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BooksForm;




// http://localhost:4000/api/v1/insert?tableName=books