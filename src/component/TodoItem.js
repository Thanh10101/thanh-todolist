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
          <h3 className="todo-name">T??n todo: {todo.name}</h3>
          <p className="todo-time">Ng??y: {todo.time}</p>
          <p className="todo-status">
            {todo.complete ? "Tr???ng th??i:???? xong" : "Tr???ng th??i:Chua xong"}
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
              title="C?? mu???n x??a todo n??y ?"
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
        title="s???a todo"
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
                message: "Vui  l??ng ??i???n todo!",
              },
            ]}
          >
            <Input placeholder="T??n todo" />
          </Form.Item>

          <Form.Item
            name="time"
            rules={[
              {
                required: true,
                message: "Vui l??ng ??i???n th???i gian!",
              },
            ]}
          >
            <DatePicker placeholder="Ch??a xong" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              S???a l???i v?? c???p nh???t
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Col>
  );
}
export default TodoItem;
