/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react';
import { cognitoHostedUI } from '@/utils/constants';
import { getGuestAccess } from '@/utils/fetches';
import { User } from '@/utils/types';
import { RiMenuAddLine } from "react-icons/ri";

interface LinkProps {
  href: string;
  text: string;
}

interface NavbarProps {
  links?: LinkProps[];
  title?: string;
  user: null | User;
}

const defaultLinks: LinkProps[] = [
  { href: '/chat', text: 'Go To Chat →' },
  { href: '/documents', text: 'Manage Docs' },
  { href: "/blog", text: "Blogs" },
];

const Navbar: React.FC<NavbarProps> = (props) => {
  const links = props.links ? props.links : defaultLinks;
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className={`inline-flex items-center bg-orange-500 px-1 flex-wrap rounded-full navsm:rounded mt-3 mx-3`}>
      <div className='flex gap-1 flex-wrap my-1 w-full'>
        <Link
          href="/"
          className="px-2 pr-4 pt-1 text-2xl font-bold text-black hover:underline decoration-black">
          MakeIt<span className="text-white">Ai</span>For.
          <span className="text-white">Me</span>
        </Link>
        <div className="sm:hidden flex flex-1">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="px-3 sm:px-4 py-1 text-lg sm:text-xl text-black border border-black rounded-full bg-white hover:bg-black whitespace-nowrap 
              font-bold sm:h-8 sm:py-0 hover:text-white"
            >
              {link.text}
            </Link>
          ))}
          {props.user == null && (
            <>
              <Link
                key={12}
                href={cognitoHostedUI}
                className="px-3 py-1 text-lg sm:text-xl border border-black text-[var(--background-color)] 
                rounded-full bg-white hover:bg-black hover:text-white whitespace-nowrap text-center font-bold sm:h-8 sm:py-0"
              >
                {'Login'}
              </Link>
              <Link
                key={13}
                href={'#'}
                onClick={() => getGuestAccess()}
                className="px-3 py-1 text-lg sm:text-xl border border-black text-[var(--background-color)] 
                rounded-full bg-white hover:bg-black hover:text-white whitespace-nowrap text-center font-bold sm:h-8 sm:py-0">
                {'Continue as Guest'}
              </Link>
            </>
          )}
        </div>
        {props.user != null ? (
          <Link
            key={11}
            href={'/profile'}
            className="flex items-center pr-1 pt-1 pb-1 pl-3 text-lg text-black sm:text-xl border border-black rounded-full bg-white hover:bg-black 
             hover:text-white whitespace-nowrap font-bold mx-1 sm:h-8 sm:py-0 sm:flex"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="pr-2">
              {isHovered ? "View Profile" : 'Hi ' + props.user.name.split(" ")[0] + '!'}
            </span>
            <div className="h-7 w-7 rounded-full object-cover">
              <img
                src={`https://source.boringavatars.com/marble/100/${props.user.userId}?colors=EF233C,FED4E7,313638,003E1F`}
                alt="Profile Picture"
              />
            </div>
          </Link>
        ) : null}
        <div className="lg:hidden flex flex-1 justify-center items-center relative">
          <RiMenuAddLine
            onClick={toggleDropdown}
            className={`cursor-pointer text-black text-2xl transition-transform duration-300 ${dropdownOpen ? 'rotate-90' : ''}`}
          />
          {dropdownOpen && (
            <div className="absolute top-8 right-0 bg-white border border-black rounded-lg shadow-lg">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                >
                  {link.text}
                </Link>
              ))}
              {props.user == null && (
                <>
                  <Link
                    key={12}
                    href={cognitoHostedUI}
                    className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                  >
                    {'Login'}
                  </Link>
                  <Link
                    key={13}
                    href={'#'}
                    onClick={() => getGuestAccess()}
                    className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                  >
                    {'Continue as Guest'}
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
