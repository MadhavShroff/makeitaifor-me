import Button from '@/components/Button';
import React from 'react';
import Img from 'next/image';
import awsExports from '@/aws-exports';

const cognitoHostedUI = `https://makeitaifor-me.auth.us-east-2.amazoncognito.com/login?client_id=1fu7ekpv47p0rbctrfagaimnjt&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fmakeitaifor.me%2F`;

function LoginPage() {
    console.log(cognitoHostedUI)
    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 text-black">
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
                <div className="flex flex-row gap-3">
                    <Button index={1} href={cognitoHostedUI} text='Login'/>
                    <Button index={1} href='/auth/signup' text='Sign Up' />
                </div>
            </div>
            <div className="py-3 text-xs">
                <a href="https://openai.com/policies/terms-of-use" target="_blank" className="mx-3 text-gray-500" rel="noreferrer">Terms of use</a>
                <span className="text-gray-600">|</span>
                <a href="https://openai.com/policies/privacy-policy" target="_blank" className="mx-3 text-gray-500" rel="noreferrer">Privacy policy</a>
            </div>
        </div>
    );
}

export default LoginPage;
