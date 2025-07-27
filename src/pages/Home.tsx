import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import CardGrid from '../components/CardGrid';
import type {Card, CardPack} from "../types/card.ts";
import {Link, useParams} from "react-router-dom";

const availablePacks = [
    { id: 'starter', name: 'Starter Pack' },
    { id: 'winter', name: 'Winter Pack' }
];
interface HomeProps {
    cards: Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const Home: React.FC<HomeProps> = ({ cards, setCards }) => {
    const { packId } = useParams<{ packId: string }>();
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

    useEffect(() => {
        if (!packId) {
            setCards([]);
            setSelectedDomain(null);
        }
    }, [packId, setCards]);

    useEffect(() => {
        if (!packId) return;
        const loadPack = async () => {
            try {
                const res = await fetch(`/packs/${packId}/pack.json`);
                const data: CardPack = await res.json();
                setCards(data.cards);
                setSelectedDomain(null);
            } catch (err) {
                console.error('Error loading pack:', err);
            }
        };
        loadPack();
    }, [packId]);

    const domainsWithCounts = cards.reduce<Record<string, number>>((acc, card) => {
        acc[card.domain] = (acc[card.domain] || 0) + 1;
        return acc;
    }, {});

    const filteredCards = selectedDomain
        ? cards.filter((card) => card.domain === selectedDomain)
        : cards;

    return (
        <div style={{ display: 'flex' }}>
            <aside style={{ width: '200px', padding: '1rem' }}>
                {!packId ? (
                    <div>
                        <h3>Select a Pack:</h3>
                        {availablePacks.map((pack) => (
                            <Link key={pack.id} to={(`/pack/${pack.id}`)}>
                                {pack.name}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Sidebar
                        domains={domainsWithCounts}
                        selected={selectedDomain}
                        onSelect={setSelectedDomain}
                        onReset={() => setSelectedDomain(null)}
                    />
                )}
            </aside>
            <main style={{ flex: 1, padding: '1rem' }}>
                {packId ? (
                    <CardGrid cards={filteredCards} />
                ) : (
                    <p>Please select a card pack to begin.</p>
                )}
            </main>
        </div>
    );
};

export default Home;
