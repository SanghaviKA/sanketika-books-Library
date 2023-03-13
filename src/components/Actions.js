import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { Table } from "antd";
import { searchBookAPI, assignBookAPI } from "./apis";
import { NotificationService } from "./notificationService.js";

const { Option } = Select;

const notification = new NotificationService();

const columns = [
  {
    title: "Book Name",
    dataIndex: "bookname",
    key: "bookname",
  },
  {
    title: "Book ID",
    dataIndex: "book_id",
    key: "book_id",
  },
  {
    title: "Branch",
    dataIndex: "branch",
    key: "branch",
  },
  {
    title: "Semester",
    dataIndex: "semester",
    key: "semester",
  },
];

const BooksForm = () => {
  const [form] = Form.useForm();

  const [selectedAction, setSelectedAction] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleActionChange = (value) => {
    setSelectedAction(value);
  };

  const handleSubmit = (values) => {
    assignBookAPI(selectedAction, values)
      .then((response) => {
        var action = "";
        if (selectedAction === "bookassign") {
          action = "assigned";
        }
        if (selectedAction === "return") {
          action = "returned";
        }
        if (selectedAction === "renewal") {
          action = "renewaled";
        }

        notification.successNotification(action);
        form.resetFields();
      })
      .catch((error) => {
        notification.errorNotification(error.response.data, selectedAction);
      });
  };

  const searchBook = (searchQuery) => {
    searchBookAPI(searchQuery)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        notification.errorNotification(selectedAction);
        setSearchResults({});
      });
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
      <div style={{ width: "800px" }}>
        <Form
          onChange={(e) => {
            e.preventDefault();
            searchBook(e.target.value);
          }}
        >
          <Form.Item name="Bookname">
            <Input placeholder="Search Your book" />
          </Form.Item>
        </Form>
        <div>
          {searchResults.length > 0 ? (
            <Table dataSource={searchResults} columns={columns} />
          ) : (
            <div></div>
          )}
        </div>

        <Form form={form} onFinish={handleSubmit}>
          <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
            Book Assigning Process
          </h2>
          <Form.Item
            label="Book ID"
            name="book_id"
            rules={[{ required: true, message: "Please enter Book ID" }]}
          >
            <Input placeholder="Enter Book ID" />
          </Form.Item>
          <Form.Item
            label="Student ID"
            name="student_id"
            rules={[{ required: true, message: "Please enter Student ID" }]}
          >
            <Input placeholder="Enter Student ID" />
          </Form.Item>
          <Form.Item
            label="Action"
            name="action"
            rules={[{ required: true, message: "Please select an action" }]}
          >
            <Select onChange={handleActionChange}>
              <Option value="bookassign">Book Assign</Option>
              <Option value="return">Return</Option>
              <Option value="renewal">Renewal</Option>
            </Select>
          </Form.Item>

          {selectedAction === "bookassign" && (
            <>
              <Form.Item
                label="Book Assigned Date"
                name="assign_date"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="No. of Days"
                name="number_of_days"
                rules={[
                  { required: true, message: "Please enter number of days" },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Enter number of days"
                  min={1}
                />
              </Form.Item>
            </>
          )}

          {selectedAction === "return" && (
            <Form.Item
              label="Return Date"
              name="return_date"
              rules={[{ required: true, message: "Please enter return date" }]}
            >
              <DatePicker />
            </Form.Item>
          )}

          <Form.Item
            label=" Days to be extended"
            name="no_days_extend"
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

export default BooksForm;
