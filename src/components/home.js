import React from 'react';
import '../styles/home.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Bem-vindo à Página Inicial</h1>
            <p>Esta é uma página inicial genérica com algumas informações básicas.</p>
            <ul>
                <li>Informação 1</li>
                <li>Informação 2</li>
                <li>Informação 3</li>
            </ul>
        </div>
    );
};

export default Home;