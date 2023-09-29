import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  function handleAddTodos(todo) {
    setTodos((todos) => [...todos, todo]);
  }

  function deleteTodo(id) {
    console.log(id);
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  function handleChecked(id) {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }

  return (
    <div className="App">
      <h1>Todo app</h1>
      <State />
      <Form onAddTodos={handleAddTodos} />
      <List
        todos={todos}
        onDeleteTodos={deleteTodo}
        onCheckedTodo={handleChecked}
      />
      <Todo />
    </div>
  );
}

function State() {
  return (
    <div>
      <button>All</button>
      <button>Checked</button>
      <button>Unchecked</button>
    </div>
  );
}

function Form({ onAddTodos }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) return;

    const newTodo = { input, completed: false, id: Date.now() };

    onAddTodos(newTodo);

    setInput("");
  }

  //
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Input Todo"
        value={input}
        onChange={handleInput}
      />
      <button type="submit">ADD</button>
    </form>
  );
}

function List({ todos, onDeleteTodos, onCheckedTodo }) {
  return (
    <div>
      <ul>
        {/* {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))} */}

        {todos.map((todo) => (
          <li todo={todo} key={todo.id} onCheckedTodo={onCheckedTodo}>
            <input
              type="checkbox"
              value={todo.checked}
              onChange={() => onCheckedTodo(todo.id)}
            />
            <span
              style={todo.checked ? { textDecoration: "line-through" } : {}}
            ></span>

            {todo.input}
            <button onClick={() => onDeleteTodos(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Todo({ todo }) {
  // return <li>{todo.input}</li>;
  return null;
}
export default App;
