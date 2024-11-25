import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Solitaire from './components/Solitaire';
import './index.css';

function App() {
    return (
        <Router>
            <header>
                <h1>Card Games</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/solitaire">Solitaire</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/solitaire" element={<Solitaire />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;

