import {  HashRouter  as Router, Routes, Route, useNavigate } from 'react-router-dom';
import '../Styles/index.css';
import Abertura from '../assets/foto22.avif';
import TodoList from '../Components/TodoList';
import { Rocket } from '@phosphor-icons/react';

// Página inicial
function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Rocket weight="fill" className="top-icon" />
      <img src={Abertura} alt="Todo List" className="app-image" />
      <h1 className="todo-title">Organize Seu Dia com Nossa Todo List</h1>
      <button className='botao1' onClick={() => navigate('/todolist')}>
        Vamos começar
      </button>
    </div>
  );
}

// Rotas principais
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todolist" element={<TodoList />} />
      </Routes>
    </Router>
  );
}
