import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CardPage from '../pages/CardPage';
import { Card } from '../types/card';

interface AppRouterProps {
    cards: Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const AppRouter: React.FC<AppRouterProps> = ({ cards, setCards }) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home cards={cards} setCards={setCards} />} />
                <Route path="/card/:cardId" element={<CardPage cards={cards} />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
