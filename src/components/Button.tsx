import { useRouter } from 'next/router';
import React from 'react';

interface ButtonProps {
    _key: number;
    href?: string;
    text: string;
    onClick?: () => void;
    color?: 'black' | string; // 'white' | 'black'
    active?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ _key, href, text, onClick, color, active, className}) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(href ? href : '/');
    };

    return (
        <button
            key={_key}
            onClick={onClick ? onClick : handleClick}
            className={
                "px-3 sm:px-4 py-1 text-lg border rounded-full hover:bg-orange-500 whitespace-nowrap font-bold m-1 dark:text-white dark:border-white " +  (active ? 'bg-orange-500' : '')
                + (className ? ' ' + className : '') + 
                (color === 'black' ? 'text-black border-black hover:text-white' : ' text-white border-white hover:text-black hover:border-black')
            }
        >
            {text}
        </button>
    );
};

export default Button;
