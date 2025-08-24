import { useState } from "react";
import "../Styles/todoIten.css";
import Foto from "../assets/foto-de-fundo.png"; // mesma imagem da Home

export default function TodoIten() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-iten-container">
      {/* BLOCO DA IMAGEM */}
      <div className="todo-left">
        <img src={Foto} alt="Banner Todo" className="todo-banner" />
      </div>

      {/* BLOCO DA TODO LIST */}
      <div className="todo-right">
        <h1>Minha Todo List</h1>

        {/* Input + botão */}
        <div className="todo-input-area">
          <input
            type="text"
            placeholder="Digite uma tarefa..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Adicionar</button>
        </div>

        {/* Lista de tarefas */}
        <ul className="todo-list">
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? "completed" : ""}>
              <span onClick={() => toggleTask(index)}>{task.text}</span>
              <button onClick={() => removeTask(index)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
