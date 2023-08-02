import Button from '@/components/Button';
import React from 'react';
import Img from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const cognitoHostedUI = `https://api.makeitaifor.me/auth/cognito`;

function LoginPage() {
    const router = useRouter();
    return (
        <div className="flex h-[100vh] w-full flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
            <div className="flex flex-col flex-auto justify-center items-center">
                <Img
                    src={"/logo_nobg.png"}
                    alt="Logo"
                    width={500}
                    height={500}
                    className='h-[40vh] w-[40vh]'
                />
                <div>Welcome to MakeIt<span className="text-orange-500">Ai</span>For.<span className="text-orange-500">Me</span></div>
                <div>Log in with your account to continue</div>
                <div className="flex flex-col w-full gap-3 mt-2">
                    {/* <Button _key={1} text='Continue as Guest' color='black' onClick={() => router.push(cognitoHostedUI)}/>  */}
                    <Button _key={2} text='Login' color='black' onClick={() => router.push(cognitoHostedUI)}/> 
                    <Button _key={3} text='Sign Up' color='black' onClick={() => router.push(cognitoHostedUI)}/>
                </div>
            </div>
            <div className="py-3 text-xs">
                <a href="https://example.com/" target="_blank" className="mx-3 text-gray-500 dark:text-white" rel="noreferrer">Terms of use</a>
                <span className="text-gray-600">|</span>
                <a href="https://example.com/" target="_blank" className="mx-3 text-gray-500 dark:text-white" rel="noreferrer">Privacy policy</a>
            </div>
        </div>
    );
}

export default LoginPage;
