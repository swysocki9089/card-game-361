// Frontend/src/components/Popup.jsx
import React from 'react';

const Popup = ({ message, onClose, onRestart }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <h2>{message}</h2>
                <button onClick={onClose}>Close</button>
                <button onClick={onRestart}>Restart</button>
            </div>
        </div>
    );
};

export default Popup;