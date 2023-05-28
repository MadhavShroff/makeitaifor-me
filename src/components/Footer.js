import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-black py-20 mt-0 bottom-0 w-full">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-2/12 mb-8">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
        </div>
        <div className="w-full md:w-2/12 mb-8">
          <h2 className="font-bold mb-4">Company</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Jobs</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
          </ul>
        </div>
        <div className="w-full md:w-2/12 mb-8">
          <h2 className="font-bold mb-4">Communities</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Artists</a></li>
            <li><a href="#" className="hover:underline">Podcasters</a></li>
            <li><a href="#" className="hover:underline">Advertisers</a></li>
            <li><a href="#" className="hover:underline">Developers</a></li>
          </ul>
        </div>
        <div className="w-full md:w-2/12 mb-8">
          <h1 className="font-bold mb-4">Useful Links</h1>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Help</a></li>
            <li><a href="#" className="hover:underline">Web Player</a></li>
          </ul>
        </div>
        <div className="w-full md:w-4/12 mb-8 md:mb-0 flex flex-col items-start md:items-end">
          <ul className="flex space-x-4 mb-8">
            <li><Image src="/instagram.png" alt="Instagram" width={24} height={24} /></li>
            <li><Image src="/twitter.png" alt="Twitter" width={24} height={24} /></li>
            <li><Image src="/facebook.png" alt="Facebook" width={24} height={24} /></li>
          </ul>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Legal</a></li>
            <li><a href="#" className="hover:underline">Privacy Center</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Cookies</a></li>
            <li><a href="#" className="hover:underline">About Ads</a></li>
          </ul>
          <p className="mt-8 text-right">© 2023 Your Company</p>
        </div>
      </div>
    </div>
    </footer>
  );
};

export default Footer;