import React from 'react';
import './css/Fireflies.scss';

const Fireflies = () => {
    return (
        <div className="firefly-container">
            {Array.from({ length: 150 }).map((_, i) => (
                <div className="firefly" key={i}></div>
            ))}
        </div>
    );
};

export default Fireflies;