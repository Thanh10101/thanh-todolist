import React, { useEffect } from "react";
import { Row, Col, Form, Input, Button, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { addTodo } from "../actions/action";
import toast from "../helpers/toast";

function TodoForm(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Todo List của Nguyễn Trịnh Thành";
    }, []);

    const onFinish = (values) => {
        const data = {
            id: uuidv4(),
            name: values.name,
            time: moment(values.time).format("DD/MM/YYYY").toString(),
            complete: false,
        };
        dispatch(addTodo(data));
        toast.success("Success", "Đã thêm todo");
    };

    return ( <
        >
        <
        Row >
        <
        h2 className = "title-Form" > Thêm todo < /h2> < /
        Row > <
        Row >
        <
        Col span = { 12 } >
        <
        Form name = "basic"
        labelCol = {
            {
                span: 8,
            }
        }
        wrapperCol = {
            {
                span: 16,
            }
        }
        initialValues = {
            {}
        }
        onFinish = { onFinish }
        autoComplete = "off" >
        <
        Form.Item name = "name"
        rules = {
            [{
                required: true,
                message: "Vui lòng điền todo",
            }, ]
        } >
        <
        Input placeholder = "Tên to do" / >
        <
        /Form.Item>

        <
        Form.Item name = "time"
        rules = {
            [{
                required: true,
                message: "Vui lòng thêm thời gian!",
            }, ]
        } >
        <
        DatePicker placeholder = "Time (DD/MM/YYYY)"
        format = "DD/MM/YYYY" / >
        </Form.Item>

        <
        Form.Item wrapperCol = {
            {
                offset: 8,
                span: 16,
            }
        } >
        <
        Button type = "primary"
        htmlType = "submit" >
        Thêm <
        /Button> < /
        Form.Item > <
        /Form> < /
        Col > <
        /Row> < / >
    );
}

export default TodoForm;