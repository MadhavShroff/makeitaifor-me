import React, { useState } from 'react';
import Button from './Button';
import Img from 'next/image';
import Avatar from "boring-avatars";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { cognitoHostedUI, cognitoLogoutUrl, cookieName } from '@/utils/constants';
import LoginPage from '@/pages/auth';

const Profile = (props) => {
    const user = props.user || null;
    // const user = { id: '915b7cd5-08c1-45c2-9709-7585af332ee4', username: 'libif87613@pixiil.com', name: 'Madhav Shroff' }

    const [activeTab, setActiveTab] = useState("Tokens Available");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const router = useRouter();

    if (!user) return (
        <section>
            <LoginPage />
        </section>
    );

    else return (
        <section className="flex p-10 bg-black text-black text-white flex-col items-center">
            <div className='flex flex-col items-center justify-center p-6 shadow-lg bg-black text-white border-4 border-white rounded-lg max-w-4xl'>
                <div className="flex flex-col md:flex-row">
                    <div id='profilePic' className="flex p-10 items-center justify-center md:w-1/4 md:h-auto md:w-auto relative antialiased">
                        <div className="rounded-full w-40 h-40">
                            <Avatar name="${user.id}"/>
                        </div>
                    </div>
                    <div id='profileMetadata' className="flex flex-col justify-center text-6xl font-bold text-center md:text-left mb-4 md:mb-0">
                        <h2 className="text-5xl sm:text-3xl lg:text-8xl leading-7 font-normal mb-4">
                            {user.name}
                        </h2>
                        <p className="text-xl sm:text-xl lg:text-4xl leading-7 text-orange-500 font-bold">
                            {user.username}
                        </p>
                        <p className="text-sm leading-7 font-normal">
                            {"#" + user.email}
                        </p>
                    </div>
                </div>
                <div className='md:flex-row'>
                    <a href={cognitoLogoutUrl}> <Button _key={1} text='Logout' /></a>
                </div>
            </div>
            <div className="flex flex-col w-full mt-10 border-4 border-white rounded-lg max-w-4xl md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex p-2 flex-row flex-wrap border-b border-white space-x-2">
                    {["Tokens Available", "Usage", "Billing", "Manage My Data"].map((tab, index) => (
                        <Button _key={index} text={tab} onClick={() => handleTabChange(tab)} color='white' active={activeTab == tab} />
                    ))}
                </div>
                <div className="md:w-3/4 p-6 text-white">
                    {/* Here goes the content of the selected tab */}
                    {activeTab}
                </div>
            </div>
        </section>
    );
};

export default Profile;
