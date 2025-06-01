import React from 'react';

interface IconProps {
    className?: string;
}

const SsolIcon: React.FC<IconProps> = ({ className }) => {
    return (
        <svg 
            className={className}
            viewBox="0 0 24 24" 
            fill="currentColor"
        >
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-9.5v5l7-6.5-7-6.5v5H6v3h5z"/>
        </svg>
    );
};

export default SsolIcon;
