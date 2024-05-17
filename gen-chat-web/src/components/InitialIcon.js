import React from 'react';

export default function InitialIcon({ initials, size }) {
    return (
        <div className="avatar placeholder">
            <div className={`bg-blue-700 text-neutral-content rounded-full w-${size}`}>
            <span className="text-sm font-bold text-white">{initials}</span>
            </div>
        </div> 
    );
};