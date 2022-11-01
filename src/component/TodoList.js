import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import TodoItem from "../component/TodoItem";

function TodoList() {
    const todos = useSelector((state) => state.todoReducer.todos);

    useEffect(() => {
        document.title = "Todo List của Nguyễn Trịnh Thành";
    }, []);
    return (
        <>
            <Row>
                <h2 className="title-List">ALl todos</h2>
            </Row>
            <Row>
                <Col span={24}>
                    <Row>
                        {todos.map((todo) => (
                            <TodoItem todo={todo} key={todo.id} />
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default TodoList;