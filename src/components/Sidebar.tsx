import React from "react";

interface SidebarProps {
    domains: Record<string, number>;
    selected: string | null;
    onSelect: (domain: string) => void;
    onReset: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ domains, selected, onSelect, onReset }) => (
    <div>
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
