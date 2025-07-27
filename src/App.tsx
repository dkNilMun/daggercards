import './App.css'
import AppRouter from "./routes/AppRouter.tsx";
import {useState} from "react";
import type {Card} from "./types/card.ts";

function App() {

    const [cards, setCards] = useState<Card[]>([]);

    return <AppRouter cards={cards} setCards={setCards} />;
}

export default App
