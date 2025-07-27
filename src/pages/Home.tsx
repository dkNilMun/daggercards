import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import CardGrid from '../components/CardGrid';
import type {Card} from "../types/card.ts";
import {Link, useParams} from "react-router-dom";

const availablePacks = [
    { id: 'breaking-the-spire', name: 'Breaking the Spire' }
];
interface HomeProps {
    cards: Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const Home: React.FC<HomeProps> = ({ cards, setCards }) => {
    const { packId } = useParams<{ packId: string }>();
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
// Import all images from all packs
    const allThumbnails = import.meta.glob('/public/packs/*/cards/*.png', {
        eager: true,
        as: 'url'
    });

    useEffect(() => {
        if (!packId) {
            setCards([]);
            setSelectedDomain(null);
            return;
        }

        // Filter images for the selected pack
        const packThumbnails = Object.entries(allThumbnails)
            .filter(([path]) => path.includes(`/packs/${packId}/cards/`));

        const cardsFromImages: Card[] = packThumbnails.map(([path, url]) => {
            const filename = path.split('/').pop() || '';
            const [domain, ...rest] = filename.replace('.png', '').split('_');
            return {
                id: filename.replace('.png', ''),
                title: rest.join(' '),
                domain,
                keywords: [],
                full: url as string,
                thumbnail: url as string
            };
        });

        setCards(cardsFromImages);
        setSelectedDomain(null);
    }, [packId, setCards]);

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
                            <div>
                            <Link key={pack.id} to={(`/pack/${pack.id}`)}>
                                {pack.name}
                            </Link>
                            </div>
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
