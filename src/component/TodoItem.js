import React, { useState } from "react";
import { Col, Popconfirm, Modal, Form, Input, Button, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, FileDoneOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import moment from "moment";
import { updateTodo, deleteTodo } from "./../actions/action";
import toast from "./../helpers/toast";

function TodoItem(props) {
  const dispatch = useDispatch();
  const { todo } = props;
  const [isPopVisible, setIsPopVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showPopconfirm = () => {
    setIsPopVisible(true);
  };

  const handlePopOk = () => {
    setConfirmLoading(true);
    dispatch(deleteTodo(todo.id));
    setConfirmLoading(false);
    setIsPopVisible(false);
    toast.success("Success", "");
  };

  const handlePopCancel = () => {
    setIsPopVisible(false);
  };

  const onFinish = (values) => {
    const data = {
      ...todo,
      name: values.name,
      time: moment(values.time).format("DD-MM-YYYY").toString(),
    };

    dispatch(updateTodo(data));
    setIsModalVisible(false);
    toast.success("Success", "");
  };

  const onFinishTodo = () => {
    const data = {
      ...todo,
      complete: true,
    };

    dispatch(updateTodo(data));
    setIsModalVisible(false);
    toast.success("Success", "");
  };

  return (
    <Col xs={2} sm={4} md={6} lg={6} xl={6}>
      <div className="todo-item">
        <div className="item-star">
          <div className="item-status">
            {todo.complete ? (
               <p></p>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <div className="item-body">
          <h3 className="todo-name">Tên todo: {todo.name}</h3>
          <p className="todo-time">Ngày: {todo.time}</p>
          <p className="todo-status">
            {todo.complete ? "Trạng thái:Đã xong" : "Trạng thái:Chua xong"}
          </p>
        </div>
        <div className="item-end">
          {!todo.complete && (
            <div className="item-icon" onClick={onFinishTodo}>
              <FileDoneOutlined
                style={{ fontSize: "20px", color: "black" }}
              />
            </div>
          )}
          <div className="item-icon" onClick={showModal}>
            <EditOutlined style={{ fontSize: "20px", color: "black" }} />
          </div>
          <div className="item-icon">
            <Popconfirm
              title="Có muốn xóa todo này ?"
              visible={isPopVisible}
              onConfirm={handlePopOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handlePopCancel}
              okText="Yes"
              cancelText="NO"
            >
              <DeleteOutlined
                style={{ fontSize: "20px", color: "black" }}
                onClick={showPopconfirm}
              />
            </Popconfirm>
          </div>
        </div>
      </div>
      <Modal
        title="sửa todo"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ name: todo.name }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Vui  lòng điền todo!",
              },
            ]}
          >
            <Input placeholder="Tên todo" />
          </Form.Item>

          <Form.Item
            name="time"
            rules={[
              {
                required: true,
                message: "Vui lòng điền thời gian!",
              },
            ]}
          >
            <DatePicker placeholder="Chưa xong" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sửa lại và cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Col>
  );
}
export default TodoItem;
