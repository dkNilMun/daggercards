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
        <button onClick={onReset} disabled={!selected}>Show All</button>
            {Object.entries(domains).map(([domain, count]) => (
                <div key={domain}>
                    <button
                        className={`domain-button domain-${domain.toLowerCase()} ${selected === domain ? 'selected' : ''}`}
                        onClick={() => onSelect(domain)}>
                        {domain} ({count})
                    </button>
                </div>
            ))}
    </div>
);

export default Sidebar;
