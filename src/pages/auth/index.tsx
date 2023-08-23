import Button from '@/components/Button';
import React from 'react';
import Img from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cognitoHostedUI } from '@/utils/constants';

function LoginPage() {
    const router = useRouter();
    return (
        <div className="flex h-[100svh] w-full flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
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
                    <button
                        key={2}
                        onClick={() => router.push(cognitoHostedUI)}
                        className={
                            "px-3 sm:px-4 py-1 text-lg border rounded-full hover:bg-orange-500 whitespace-nowrap font-bold m-1 text-black border-black hover:text-white border-black dark:text-white dark:border-white hover:text-black hover:border-black"
                        }
                    >
                        {"Login"}
                    </button>
                    <button
                        key={2}
                        onClick={() => router.push(cognitoHostedUI)}
                        className={
                            "px-3 sm:px-4 py-1 text-lg border rounded-full hover:bg-orange-500 whitespace-nowrap font-bold m-1 text-black border-black hover:text-white border-black dark:text-white dark:border-white hover:text-black hover:border-black"
                        }
                    >
                        {"Sign Up"}
                    </button>
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
