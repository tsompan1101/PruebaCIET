"use client";

import { useState } from 'react'; 

export default function Page() {
    const [isHovered, setIsHovered]  = useState(false);

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className = "p6 border rounded"
        >
            <p>Card conent</p>
            {isHovered && <span className="test-sm text green-500">Mre details</span>}
        </div>
    );
}

