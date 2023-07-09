import { useRouter } from 'next/router';
import React from 'react';

interface ButtonProps {
    key: number;
    href?: string;
    text: string;
    onClick?: () => void;
    color?: 'black' | string; // 'white' | 'black'
}

const Button: React.FC<ButtonProps> = ({ key, href, text, onClick, color}) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(href ? href : '/');
    };

    return (
        <button
            key={key}
            onClick={onClick ? onClick : handleClick}
            className="px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl border rounded-full hover:bg-orange-500 whitespace-nowrap font-bold "
            style={{
                borderColor: color === 'black' ? 'var(--background-color)' : '#ffffff',
                color: color === 'black' ? 'var(--background-color)' : '#ffffff',
            }}
        >
            {text}
        </button>
    );
};

export default Button;
