const todos = JSON.parse(localStorage.getItem("todos")) || [];
const initialState = {
    todos: todos,
};

const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case "ADD_TODO":{
            const newTodos = [...state.todos, action.payload];
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return{todos: newTodos};
        }
        case "UPDATE_TODO":{
            const filterTodos = state.todos.filter(
                (todo) => todo.id !== action.payload.id
            );
            const newTodos = [...filterTodos, action.payload];
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return{todos:newTodos};
        }
        case "DELETE_TODO":{
            const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return{todos: newTodos};
        }
        default:
            return state;
    }
};

export default todoReducer;