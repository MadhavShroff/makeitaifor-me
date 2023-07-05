import { useRouter } from 'next/router';
import React from 'react';

interface ButtonProps {
    index: number;
    href?: string;
    text: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ index, href, text, onClick }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(href ? href : '/');
    };

    return (
        <button
            key={index}
            onClick={onClick ? onClick : handleClick}
            className="px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl border rounded-full hover:bg-orange-500 whitespace-nowrap font-bold"
            style={{
                borderColor: 'var(--background-color)',
                color: 'var(--background-color)',
            }}
        >
            {text}
        </button>
    );
};

export default Button;
