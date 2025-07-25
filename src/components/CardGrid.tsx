import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardGrid.css';
import type {Card} from "../types/card.ts"; // optional for styling

interface CardGridProps {
    cards: Card[];
}

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
    const navigate = useNavigate();

    return (
        <div className="card-grid">
            {cards.map((card) => (
                <div
                    key={card.id}
                    className="card-item"
                    onClick={() => navigate(`/card/${card.id}`)}
                >
                    <img
                        src={card.thumbnail}
                        alt={card.title}
                        className="card-thumb"
                    />
                    <div className="card-title">{card.title}</div>
                </div>
            ))}
        </div>
    );
};

export default CardGrid;
