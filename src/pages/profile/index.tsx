import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { fetchUser } from '@/utils/fetches';
import Profile from '@/components/Profile';

const ProfilePage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchUser(setUser);
    }, []);

    return (
        <>
            <Navbar user={user} />
            <Profile user={user}/> 
            <Footer />
        </>
    );
};

export default ProfilePage;
