import { fetchUser } from "@/utils/fetches";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/landing-page/Navbar";
import Sidebar from "@/components/modules-page/Sidebar";
import GoogleSearch from "@/components/modules-page/modules/GoogleSearch";

const ModulesIndex = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-black">
      <Navbar user={user} />
      <div className="flex ">
        <Sidebar />
        <div className="ml-52 p-4 w-full h-screen">
          <GoogleSearch />
        </div>
      </div>
    </main>
  );
};

export default ModulesIndex;
