import { fetchUser } from "@/utils/fetches";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/landing-page/Navbar";
import Sidebar from "@/components/modules-page/Sidebar";
import GoogleSearch from "@/components/modules-page/modules/GoogleSearch";
import CitedContentDisplay from "@/components/CitedContentDisplay";

const ModulesIndex = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-black w-full">
      <div className="w-full flex justify-center md:pl-48 ">
        <Navbar user={user} />
      </div>
      <div className="flex flex-col md:flex-row w-full">
        <Sidebar />
        <div className="md:ml-48 p-4 w-full min-h-screen center-div mx-auto">
          <GoogleSearch />
          <section
            id="section2"
            className="h-screen bg-orange-500 mb-4 rounded p-4 pb-20"
          >
            Module 2
          </section>
        </div>
      </div>
    </main>
  );
};

export default ModulesIndex;
