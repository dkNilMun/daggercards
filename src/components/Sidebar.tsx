import React from "react";
import {Link} from "react-router-dom";
import './Sidebar.css';

interface SidebarProps {
    domains: Record<string, number>;
    selected: string | null;
    onSelect: (domain: string) => void;
    onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ domains, selected, onSelect, onReset }) => (
    <div className="sidebar-top">
        <Link to="/">Pack selection</Link>
        <button
            className={`domain-button ${selected === null ? 'selected' : ''}`}
            onClick={onReset} disabled={!selected}>Show All</button>
        {Object.entries(domains)
            .sort(([a], [b]) => {
                if (a === 'Classes') return -1;
                if (b === 'Classes') return 1;
                return a.localeCompare(b);
            })
            .map(([domain, count]) => (
                <div key={domain}>
                    <button
                        className={`domain-button domain-${domain.toLowerCase()} ${selected === domain ? 'selected' : ''}`}
                        style={{ display: "block", width: "100%", textAlign: "left" }}
                        onClick={() => onSelect(domain)}
                    >
                        {domain} ({count})
                    </button>
                </div>
            ))}
    </div>
);

export default Sidebar;
