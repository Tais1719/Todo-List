import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/todoList.css"; // Seu CSS
import '../Styles/mediaScreenList.css'
import Foto from "../assets/foto-de-fundo.png";

export default function TodoIten() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = newTask.trim();
    if (!text) return;
    setTasks(prev => [...prev, { id: Date.now(), text, completed: false }]);
    setNewTask("");
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    const text = editText.trim();
    if (!text) return;
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, text } : t)));
    setEditId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const completeTask = (id) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: true } : t)));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const goToHome = () => navigate("/");

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const TaskList = ({ items, title, emptyMessage, showComplete }) => (
    <div className="task-section">
      <h3 className="section-title">{title}</h3>
      {items.length === 0 ? (
        <p className="empty-message">{emptyMessage}</p>
      ) : (
        <ul className="todo-list">
          {items.map(task => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <div className="task-row">
                <div className="task-text">
                  {editId === task.id ? (
                    <div className="edit-row">
                      <input
                        className="edit-input"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === "Enter") saveEdit(task.id);
                          if (e.key === "Escape") cancelEdit();
                        }}
                        autoFocus
                      />
                      <button className="mini-btn save" onClick={() => saveEdit(task.id)}>💾</button>
                      <button className="mini-btn cancel" onClick={cancelEdit}>❌</button>
                    </div>
                  ) : (
                    <span>{task.text}</span>
                  )}
                </div>

                {editId !== task.id && (
                  <div className="task-actions">
                    {!task.completed && (
                      <>
                        {/* Ícones substituindo os botões */}
                        <button className="edit-btn" onClick={() => startEdit(task)}>
                          ✏️
                        </button>
                        {showComplete && (
                          <button className="complete-btn" onClick={() => completeTask(task.id)}>
                            ✅
                          </button>
                        )}
                        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                          🗑️
                        </button>
                      </>
                    )}
                    {task.completed && (
                      <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
                    )}
                  </div>
                )}
              </div>
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
        {/* Botão movido para aqui - abaixo da imagem */}
        <button className="back-top-btn" onClick={goToHome}>⬅️ Voltar ao Início</button>
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
              onKeyDown={e => e.key === 'Enter' && addTask()}
            />
            <button className="add-btn" onClick={addTask}>Adicionar</button>
          </div>
        </div>

        <div className="tasks-container">
          <TaskList
            items={pendingTasks}
            title="📌 Tarefas Pendentes"
            emptyMessage="Nenhuma tarefa pendente! 🎉"
            showComplete
          />
          <TaskList
            items={completedTasks}
            title="✅ Tarefas Finalizadas"
            emptyMessage="Nenhuma tarefa concluída ainda."
            showComplete={false}
          />
        </div>

        <div className="stats">
          <span className="stat-item">Total: <strong>{tasks.length}</strong></span>
          <span className="stat-item">Pendentes: <strong>{pendingTasks.length}</strong></span>
          <span className="stat-item">Concluídas: <strong>{completedTasks.length}</strong></span>
        </div>
      </div>
    </div>
  );
}
