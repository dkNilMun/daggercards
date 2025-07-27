import React from "react";
import {Link} from "react-router-dom";

interface SidebarProps {
    domains: Record<string, number>;
    selected: string | null;
    onSelect: (domain: string) => void;
    onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ domains, selected, onSelect, onReset }) => (
    <div>
        <Link to="/">Pack selection</Link>
        <button onClick={onReset} disabled={!selected}>Show All</button>
        <ul>
            {Object.entries(domains).map(([domain, count]) => (
                <li key={domain}>
                    <button onClick={() => onSelect(domain)}>
                        {domain} ({count})
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

export default Sidebar;
