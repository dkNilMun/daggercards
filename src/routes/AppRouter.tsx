import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CardPage from "../pages/CardPage.tsx";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/card/:cardId" element={<CardPage />} />
            </Routes>
        </Router>
    );
}
