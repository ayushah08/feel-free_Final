import React, { useState } from 'react'
import { Eye, EyeOff, HeartHandshake } from 'lucide-react'
import './auth.css'

const USERS_KEY = 'feelfree_users'
const CURRENT_USER_KEY = 'feelfree_current_user'

const Login = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' })
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [error, setError] = useState('')

  const getUsers = () => {
    try {
      const raw = localStorage.getItem(USERS_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

//   const API_BASE = "http://10.203.116.91:8080/api";
// const handleRegister = async (event) => {
//   event.preventDefault();
//   setError("");

//   const name = registerData.name.trim();
//   const email = registerData.email.trim().toLowerCase();
//   const password = registerData.password.trim();

//   if (!name || !email || !password) return setError("Please fill all sign up fields.");
//   if (password.length < 6) return setError("Password must be at least 6 characters.");

//   try {
//    const res = await fetch("http://10.203.116.91:8080/api/auth/register", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ userName: name, email, password }),
// });

// const text = await res.text();    
// let data;
// try { data = JSON.parse(text); } catch { data = { message: text }; }

// if (!res.ok) {
//   console.log("STATUS:", res.status);
//   console.log("BACKEND:", data);
//   throw new Error(data?.message || "Register failed");
// }

//     if (data.token) localStorage.setItem("feelfree_token", data.token);

//     const sessionUser = data.user ?? { name, email };
//     localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
//     onAuthSuccess?.(sessionUser);
//   } catch (err) {
//     setError(err.message);
//   }
// };

// const handleLogin = async (event) => {
//   event.preventDefault();
//   setError("");

//   const email = loginData.email.trim().toLowerCase();
//   const password = loginData.password.trim();

//   if (!email || !password) {
//     return setError("Please enter email and password.");
//   }

//   try {
//     const res = await fetch("http://10.203.116.91:8080/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const text = await res.text();
//     let data;
//     try { data = JSON.parse(text); } catch { data = { message: text }; }

//     if (!res.ok) {
//       console.log("STATUS:", res.status);
//       console.log("BACKEND:", data);
//       throw new Error(data?.message || "Login failed");
//     }

//     // token save
//     if (data.token) localStorage.setItem("feelfree_token", data.token);

//     // user save
//     const sessionUser = data.user ?? { email };
//     localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
//     onAuthSuccess?.(sessionUser);

//   } catch (err) {
//     setError(err.message);
  // }
};

  return (
    <section className='auth-screen'>
      <div className={`auth-container ${isSignUp ? 'active' : ''}`}>
        <div className='auth-form-container auth-sign-up'>
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
         
            <span>or use your email for registration</span>
            <input
              type='text'
              placeholder='Name'
              value={registerData.name}
              onChange={(event) => setRegisterData((prev) => ({ ...prev, name: event.target.value }))}
            />
            <input
              type='email'
              placeholder='Email'
              value={registerData.email}
              onChange={(event) => setRegisterData((prev) => ({ ...prev, email: event.target.value }))}
            />
            <div className='auth-password-row'>
              <input
                type={showRegisterPassword ? 'text' : 'password'}
                placeholder='Password'
                value={registerData.password}
                onChange={(event) => setRegisterData((prev) => ({ ...prev, password: event.target.value }))}
              />
              <button
                type='button'
                className='auth-eye-btn'
                onClick={() => setShowRegisterPassword((prev) => !prev)}
                aria-label='Toggle register password'
              >
                {showRegisterPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button type='submit'>Sign Up</button>
          </form>
        </div>

        <div className='auth-form-container auth-sign-in'>
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
         
            <span>or use your email and password</span>
            <input
              type='email'
              placeholder='Email'
              value={loginData.email}
              onChange={(event) => setLoginData((prev) => ({ ...prev, email: event.target.value }))}
            />
            <div className='auth-password-row'>
              <input
                type={showLoginPassword ? 'text' : 'password'}
                placeholder='Password'
                value={loginData.password}
                onChange={(event) => setLoginData((prev) => ({ ...prev, password: event.target.value }))}
              />
              <button
                type='button'
                className='auth-eye-btn'
                onClick={() => setShowLoginPassword((prev) => !prev)}
                aria-label='Toggle login password'
              >
                {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <a href='#'>Forgot your password?</a>
            <button type='submit'>Sign In</button>
          </form>
        </div>

        <div className='auth-toggle-container'>
          <div className='auth-toggle'>
            <div className='auth-toggle-panel auth-toggle-left'>
              <span className='auth-brand-icon'>
                <HeartHandshake size={24} />
              </span>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info.</p>
              <button type='button' className='auth-hidden' onClick={() => switchMode(false)}>
                Sign In
              </button>
            </div>
            <div className='auth-toggle-panel auth-toggle-right'>
              <span className='auth-brand-icon'>
                <HeartHandshake size={24} />
              </span>
              <h1>Hello, Friend!</h1>
              <p>Register to get access to exclusive features and content.</p>
              <button type='button' className='auth-hidden' onClick={() => switchMode(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && <p className='auth-error'>{error}</p>}
    </section>
  )
// }

export default Login
