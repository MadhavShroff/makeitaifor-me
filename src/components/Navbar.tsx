/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface LinkProps {
  href: string;
  text: string;
}

interface NavbarProps {
  links?: LinkProps[];
  title?: string;
  user?: any;
}

const defaultLinks: LinkProps[] = [
  { href: '/scheduler', text: 'Scheduler' },
  { href: '/outreach', text: 'Outreach' },
  { href: '/writing', text: 'Content Writing' },
  { href: '/documents', text: 'Documents' },
  { href: '/newsletter', text: 'Newsletter' },
];

const Navbar: React.FC<NavbarProps> = (props) => {
  const links = props.links ? props.links : defaultLinks;
  const [user, setUser] = useState(props.user);
  const [isScrollable] = useState(false);

  return (
    <nav
      className={`flex items-center justify-between bg-white shadow-lg px-1`}
    >
      <Link
        href="/"
        className="px-2 sm:px-4 py-1 sm:py-2 text-2xl sm:text-4xl font-bold text-black mr-4 hover:underline rounded decoration-orange-500 decoration-4"
      >
        MakeIt<span className="text-orange-500">Ai</span>For.
        <span className="text-orange-500">Me</span>
      </Link>
      <div className="relative w-full h-full overflow-hidden hor-scroll-wrap justify-end">
        <div
          id="navbar"
          className="flex gap-2 sm:gap-2 overflow-x-auto justify-start scrollbar-hide hor-scroll pr-8 pl-5"
        >
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl border rounded-full hover:bg-orange-500 whitespace-nowrap font-bold"
              style={{
                borderColor: 'var(--background-color)',
                color: 'var(--background-color)',
              }}
            >
              {link.text}
            </Link>
          ))}
        </div>
        {isScrollable && <div className="navbar-fade"></div>}
      </div>
      {user != null ? (
        <Link
          key={11}
          href={'/profile'}
          className="flex items-center pr-1 pt-1 pb-1 pl-3 sm:px-4 sm:py-2 text-lg sm:text-xl border rounded-full hover:bg-orange-500 whitespace-nowrap font-bold"
          style={{
            borderColor: 'var(--background-color)',
            color: 'var(--background-color)',
          }}
        >
          <span className="pr-2">{'Profile'}</span>
          <div className="h-7 w-7 rounded-full object-cover border-black border-2">
            <img
              src="https://source.boringavatars.com/marble/100/@Madhav?colors=EF233C,FED4E7,313638,003E1F"
              alt="Profile Picture"
            />
          </div>
        </Link>
      ) : (
        <Link
          key={12}
          href={'/auth'} // replace with your logout link
          className="px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl border rounded-full hover:bg-orange-500 whitespace-nowrap text-center font-bold"
            style={{
            borderColor: 'var(--background-color)',
            color: 'var(--background-color)',
          }}
        >
          {'Login'}
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
