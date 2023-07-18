import Button from '@/components/Button';
import React from 'react';
import Img from 'next/image';

const cognitoHostedUI = `https://api.makeitaifor.me/auth/cognito`;

function LoginPage() {
    return (
        <div className="flex h-[95vh] w-full flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
            <div className="w-96 flex flex-col flex-auto justify-center items-center">
                <div className="mb-5">
                    <Img
                        src={"/logo_nobg.png"}
                        alt="Logo"
                        width={1000}
                        height={1000}
                        className="md:w-500 md:h-500"
                    />
                </div>
                <div className="mb-2 text-center">Welcome to MakeIt<span className="text-orange-500">Ai</span>For.<span className="text-orange-500">Me</span></div>
                <div className="mb-4 text-center">
                    Log in with your account to continue
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Button _key={1} href={cognitoHostedUI} text='Login' color='black'/>
                    <Button _key={1} href={cognitoHostedUI} text='Sign Up' color='black'/>
                </div>
            </div>
            <div className="py-3 text-xs">
                <a href="https://openai.com/policies/terms-of-use" target="_blank" className="mx-3 text-gray-500 dark:text-white" rel="noreferrer">Terms of use</a>
                <span className="text-gray-600">|</span>
                <a href="https://openai.com/policies/privacy-policy" target="_blank" className="mx-3 text-gray-500 dark:text-white" rel="noreferrer">Privacy policy</a>
            </div>
        </div>
    );
}

export default LoginPage;
