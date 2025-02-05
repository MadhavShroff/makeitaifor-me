import React from "react";

export default function CustomModal({ visible, onClose, children }) {
    if (!visible) return null;

    const handleOnBackDropClick = (e) => {
        console.log("backdrop clicked");    
        if (e.target.id === "backdrop") onClose && onClose();
    };

    return (
        <div
            id="backdrop"
            onClick={handleOnBackDropClick}
            className="bg-black bg-opacity-50 backdrop-blur-xs fixed inset-0 flex items-center justify-center z-50"
        >
            {children}
        </div>
    );
}