import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type {Card} from "../types/card.ts";

interface CardPageProps {
    cards: Card[]; // this should be passed from parent or managed via context
}

const CardPage: React.FC<CardPageProps> = ({ cards }) => {
    const { cardId } = useParams<{ cardId: string }>();
    const navigate = useNavigate();
    const [card, setCard] = useState<Card | undefined>(undefined);

    useEffect(() => {
        const found = cards.find((c) => c.id === cardId);
        setCard(found);
    }, [cardId, cards]);

    if (!card) {
        return (
            <div style={{ padding: '2rem' }}>
                <p>Card not found.</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>
                ← Back
            </button>
            <h2>{card.title}</h2>
            <p><strong>Domain:</strong> {card.domain}</p>
            <div>
                <img
                    src={card.full}
                    alt={card.title}
                    style={{ maxWidth: '100%', minWidth: "60vw", height: 'auto', borderRadius: '8px' }}
                />
            </div>
        </div>
    );
};

export default CardPage;
