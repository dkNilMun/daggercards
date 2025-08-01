import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import CardGrid from '../components/CardGrid';
import type {Card} from "../types/card.ts";
import {Link, useParams} from "react-router-dom";

const FILTER_STORAGE_KEY = 'selectedDomainFilter';

const availablePacks = [
    { id: 'breaking-the-spire', name: 'Breaking the Spire' }
];
interface HomeProps {
    cards: Card[];
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const Home: React.FC<HomeProps> = ({ cards, setCards }) => {
    const { packId } = useParams<{ packId: string }>();
    const [selectedDomain, setSelectedDomain] = useState<string | null>(() => {
        return sessionStorage.getItem(FILTER_STORAGE_KEY) || null;
    });

    // Import all images from all packs
    const allThumbnails = import.meta.glob('/public/packs/*/cards/*/*.png', {
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
            // Extract domain from folder after /cards/
            const domainMatch = path.match(/\/cards\/([^/]+)\//);
            const domain = domainMatch ? domainMatch[1] : 'Unknown';

            const filename = path.split('/').pop() || '';
            const title = filename.replace('.png', '').replace(/_/g, ' ');

            return {
                id: filename.replace('.png', ''),
                title,
                domain,
                keywords: [],
                full: url as string,
                thumbnail: url as string
            };
        });

        setCards(cardsFromImages);
        setSelectedDomain(null);
    }, [packId, setCards]);

    useEffect(() => {
        // When cards are updated, restore the domain filter if it's present
        if (cards.length > 0) {
            const storedDomain = sessionStorage.getItem(FILTER_STORAGE_KEY);
            if (storedDomain && cards.some((c) => c.domain === storedDomain)) {
                setSelectedDomain(storedDomain);
            } else {
                // If the stored domain isn't valid for this pack, clear it
                setSelectedDomain(null);
                sessionStorage.removeItem(FILTER_STORAGE_KEY);
            }
        }
    }, [cards]);

    const domainsWithCounts = cards.reduce<Record<string, number>>((acc, card) => {
        acc[card.domain] = (acc[card.domain] || 0) + 1;
        return acc;
    }, {});

    const filteredCards = selectedDomain
        ? cards.filter((card) => card.domain === selectedDomain)
        : cards;

    return (
        <div className="main-layout" style={{ display: 'flex' }}>
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
                        onSelect={(domain) => {
                            setSelectedDomain(domain);
                            sessionStorage.setItem(FILTER_STORAGE_KEY, domain);
                        }}
                        onReset={() => {
                            setSelectedDomain(null);
                            sessionStorage.removeItem(FILTER_STORAGE_KEY);
                        }}
                    />
                )}
            </aside>
            <main style={{ flex: 1, padding: '1rem' }}>
                {packId ? (
                    <>
                        <h1 style={{textAlign: "center"}}>{selectedDomain}</h1>
                    <CardGrid cards={filteredCards} />
                    </>
                ) : (
                    <p>Please select a card pack to begin.</p>
                )}
            </main>
        </div>
    );
};

export default Home;
