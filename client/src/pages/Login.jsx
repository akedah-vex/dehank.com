import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'
import Logo from '../components/Logo'

const Login = () => {
  const { handleLogin, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChangeEvent = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChangeEvent = (event) => {
    setPassword(event.target.value);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    console.log("logging in")
    const response = await handleLogin(username, password);
    console.log("client-login:", response)
    if (response.data.success === true)
    {
        setUser(username);
        setUsername('')
        setPassword('');
        console.log("success");
        alert("Log in success")
        navigate('/games');
    }
    else {
      alert("Failed to login")
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black font-sans">
      {/* Dynamic swirling colorful background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#ff00ff_0%,transparent_50%)] animate-[spin_25s_linear_infinite]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,#00ffff_0%,transparent_50%)] animate-[spin_35s_linear_infinite_reverse]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,#ffff00_0%,transparent_60%)] animate-[spin_20s_linear_infinite]" />
     
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
       
        {/* deHank! Title */}
        <Logo text={"login!"}/>

        <p 
          className="text-2xl font-bold text-white tracking-widest pt-5 pb-10 opacity-0 animate-[popIn_0.6s_forwards]"
          style={{ animationDelay: '300ms' }}
        >
          LOG IN TO THE FUN ZONE
        </p>
         
        {/* Login Box */}
        <div 
          className="bg-white border-8 border-black p-8 shadow-[12px_12px_0_#000] relative opacity-0 animate-[popIn_0.65s_forwards]"
          style={{ animationDelay: '550ms' }}
        >
          {/* Comic shine effect */}
          <div className="absolute -top-5 -right-7 bg-yellow-400 text-black text-lg font-black px-5 py-1 border-4 border-black rotate-12 shadow-md">
            TOP SECRET
          </div>

          <form className="space-y-8" onSubmit={handleFormSubmit}>
            {/* Username */}
            <div className="opacity-0 animate-[popIn_0.6s_forwards]" style={{ animationDelay: '750ms' }}>
              <label className="block text-black font-black text-xl mb-2 tracking-wider">USERNAME</label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChangeEvent}
                placeholder="radical_dude_840"
                className="w-full border-4 border-black px-5 py-4 text-xl font-bold bg-white focus:bg-yellow-100 transition-colors outline-none"
                style={{ boxShadow: 'inset 4px 4px 0 #000' }}
              />
            </div>

            {/* Password */}
            <div className="opacity-0 animate-[popIn_0.6s_forwards]" style={{ animationDelay: '850ms' }}>
              <label className="block text-black font-black text-xl mb-2 tracking-wider">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChangeEvent}
                placeholder="••••••••"
                className="w-full border-4 border-black px-5 py-4 text-xl font-bold bg-white focus:bg-yellow-100 transition-colors outline-none"
                style={{ boxShadow: 'inset 4px 4px 0 #000' }}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              onClick={handleFormSubmit}
              className="w-full bg-black hover:cursor-pointer hover:bg-[#ff00ff] text-white border-4 border-black py-6 text-3xl font-black tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[6px_6px_0_#fff] opacity-0 animate-[popIn_0.6s_forwards]"
              style={{ animationDelay: '1000ms' }}
            >
              LOGIN
            </button>

            {/* Register Button */}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="w-full bg-transparent hover:cursor-pointer hover:bg-white text-black border-4 border-black py-5 text-2xl font-black tracking-wider transition-all hover:scale-105 active:scale-95 opacity-0 animate-[popIn_0.6s_forwards]"
              style={{ animationDelay: '1150ms' }}
            >
              NEW HERE?<br/>REGISTER
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-8 opacity-0 animate-[popIn_0.6s_forwards]" style={{ animationDelay: '1300ms' }}>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert("Forgot your password? Tough luck, dude! (just kidding, coming soon)"); }}
              className="text-black font-bold underline decoration-yellow-400 hover:text-pink-600 transition-colors text-lg"
            >
              FORGOT PASSWORD?
            </a>
          </div>
        </div>

        {/* Footer */}
        <p 
          className="text-center text-white/60 text-sm font-mono tracking-widest mt-8 opacity-0 animate-[popIn_0.6s_forwards]"
          style={{ animationDelay: '1500ms' }}
        >
          EST. 2026 • NO BOOMERS ALLOWED
        </p>
      </div>

      {/* Global keyframes */}
      <style jsx global>{`
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
    </div>
  );
};

export default Login;







