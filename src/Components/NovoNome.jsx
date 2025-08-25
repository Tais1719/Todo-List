import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/todoIten.css";
import Foto from "../assets/foto-de-fundo.png";

export default function TodoIten() {
  // Inicializa tasks a partir do localStorage
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const navigate = useNavigate();

  // Salva no localStorage sempre que tasks mudar
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { text: newTask, completed: false, id: Date.now() };
    setTasks(prev => [...prev, task]);
    setNewTask("");
  };

  const toggleTaskSelection = (id) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(prev => prev.filter(taskId => taskId !== id));
    } else {
      setSelectedTasks(prev => [...prev, id]);
    }
  };

  const markSelectedAsCompleted = () => {
    setTasks(prev =>
      prev.map(task =>
        selectedTasks.includes(task.id) ? { ...task, completed: true } : task
      )
    );
    setSelectedTasks([]);
  };

  const removeSelectedTasks = () => {
    setTasks(prev => prev.filter(task => !selectedTasks.includes(task.id)));
    setSelectedTasks([]);
  };

  const goToHome = () => navigate("/");

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const TaskList = ({ tasks, title, emptyMessage }) => (
    <div className="task-section">
      <h3 className="section-title">{title}</h3>
      {tasks.length === 0 ? (
        <p className="empty-message">{emptyMessage}</p>
      ) : (
        <ul className="todo-list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={selectedTasks.includes(task.id)}
                onChange={() => toggleTaskSelection(task.id)}
              />
              <span>{task.text}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="todo-container">
      <div className="todo-left">
        <div className="image-placeholder">
          <img src={Foto} alt="Banner Todo" className="todo-banner" />
        </div>
      </div>

      <div className="todo-right">
        <h1>Minha Todo List</h1>

        <div className="input-section">
          <div className="input-add-container">
            <input
              type="text"
              placeholder="Digite uma tarefa..."
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addTask()}
            />
            <button className="add-btn" onClick={addTask}>➕ Adicionar</button>
          </div>
        </div>

        <div className="tasks-container">
          <TaskList tasks={pendingTasks} title="📌 Tarefas Pendentes" emptyMessage="Nenhuma tarefa pendente! 🎉" />
          <TaskList tasks={completedTasks} title="✅ Tarefas Finalizadas" emptyMessage="Nenhuma tarefa concluída ainda." />
        </div>

        <div className="button-group">
          <button
            className="complete-btn"
            onClick={markSelectedAsCompleted}
            disabled={selectedTasks.length === 0}
          >
            ✅ Marcar Feita
          </button>
          <button
            className="delete-btn"
            onClick={removeSelectedTasks}
            disabled={selectedTasks.length === 0}
          >
            🗑️ Excluir
          </button>
        </div>

        <div className="stats">
          <span className="stat-item">Total: <strong>{tasks.length}</strong></span>
          <span className="stat-item">Pendentes: <strong>{pendingTasks.length}</strong></span>
          <span className="stat-item">Concluídas: <strong>{completedTasks.length}</strong></span>
        </div>

        <button className="back-top-btn" onClick={goToHome}>⬅️ Voltar ao Início</button>
      </div>
    </div>
  );
}
