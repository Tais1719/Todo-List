import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import '../Styles/index.css';
import Abertura from '../assets/foto22.avif';
import TodoIten from '../Components/TodoIten';
import { Rocket } from '@phosphor-icons/react';

// Página inicial
function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      {/* Ícone no topo */}
      {/* Ícone no topo */}
      <Rocket  weight="fill"className="top-icon" />


      <img src={Abertura} alt="Todo List" className="app-image" />
      <h1 className="todo-title">Organize Seu Dia com Nossa Todo List</h1>
      <button onClick={() => navigate('/todoiten')}>Vamos começar</button>
    </div>
  );
}

// Rotas principais
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todoiten" element={<TodoIten />} />
      </Routes>
    </Router>
  );
}
