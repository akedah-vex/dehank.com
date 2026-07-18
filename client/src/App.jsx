import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Games from './pages/Games'

function App() {
  const render = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-150%) rotate(-3deg); }
          100% { transform: translateX(300%) rotate(-3deg); }
        }
        
        .animate-spin-slow {
          animation: spin 40s linear infinite;
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
       
        @keyframes shine {
          0% { transform: translateX(-150%) rotate(-3deg); }
          100% { transform: translateX(300%) rotate(-3deg); }
        }
      `}</style>

      </>
    )
  }
  return (render());
}

export default App