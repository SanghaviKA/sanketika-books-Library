import React, { useState } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Search from "antd/es/transfer/search";
import { Table } from "antd";

const { Option } = Select;

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
    axios
      .post(
        "http://localhost:4000/api/v1/library/books/assign?tableName=bookassign",
        values
      )
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

        showSuccessNotification(action);
        form.resetFields();
      })
      .catch((error) => {
        console.log("error" + error);
        showErrorNotification(error.response.data, selectedAction);
      });
  };

  const showErrorNotification = (message, action) => {
    toast("Your book has been failed to " + action + "- " + message, {
      duration: 4000,
      position: "top-center",

      style: {},
      className: "",

      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },

      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };

  const showSuccessNotification = (status) => {
    toast("Your book has been " + status, {
      duration: 4000,
      position: "top-center",

      style: {},
      className: "",

      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },

      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
  };

  const searchBook = (searchQuery) => {
    const values = { query: searchQuery };
    axios
      .post("http://localhost:4000/api/v1/library/books/search", values)
      .then((response) => {
        console.log("response" + JSON.stringify(response.data));

        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(error);
        showErrorNotification(selectedAction);
        setSearchResults({});
      });
  };

  const navigateToDetails = () => {
    window.location.href = "/";
  };

  return (
    <div>
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
        <h2>Book Assigning Process</h2>
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
          {/* <Input placeholder="enter action" /> */}
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
              <Input type="number" placeholder="Enter number of days" min={1} />
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
  );
};

export default BooksForm;
