/* eslint-disable prettier/prettier */
import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <>
    <footer className="bg-orange-500 text-black py-20 mt-0 bottom-0 w-full static overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-4/12 mb-8">
            <Image src="/logo_nobg.png" alt="Logo" width={300} height={300} />
          </div>
          {/* <div className="w-full md:w-2/12 mb-8">
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
          </div> */}
          <div className="w-full md:w-2/12 mb-8 md:mb-0 flex flex-col items-start">
            <ul className="flex space-x-4 mb-8">
              <li><a href='https://github.com/MadhavShroff'><Image src="/github.png" alt="Instagram" width={50} height={50} className="border-4 border-black border-2 rounded"/></a></li>
              <li><a href='https://github.com/MadhavShroff'><Image src="/twitter.png" alt="Twitter" width={50} height={50} /></a></li>
              <li><Image src="/linkedin.png" alt="Facebook" width={50} height={50} /></li>
            </ul>
            {/* <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Legal</a></li>
              <li><a href="#" className="hover:underline">Privacy Center</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Cookies</a></li>
            </ul> */}
            {/* <div className="mt-8"> Made with 💙 </div>
            <div> By Madhav Shroff </div> */}
          </div>
          <Image src="/image3.svg" alt="image" className="absolute w-[24vh] right-0 bottom-0" width={500} height={500} />
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;