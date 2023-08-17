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
  user: null | { id: string, username: string, name: string };
}

const defaultLinks: LinkProps[] = [
  // { href: '/scheduler', text: 'Scheduler' },
  // { href: '/outreach', text: 'Outreach' },
  // { href: '/writing', text: 'Content Writing' },
  { href: '/chat', text: 'Chat' },
  { href: '/documents', text: 'Manage Documents' },
  // { href: '/newsletter', text: 'Newsletter' },
];

const Navbar: React.FC<NavbarProps> = (props) => {
  const links = props.links ? props.links : defaultLinks;
  const [isScrollable] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className={`flex items-center justify-between bg-white px-1 flex-wrap rounded`}>
      <Link
        href="/"
        className="px-2 py-1 sm:py-2 text-2xl font-bold text-black hover:underline decoration-orange-500">
        MakeIt<span className="text-orange-500">Ai</span>For.
        <span className="text-orange-500">Me</span>
      </Link>
      <div className='flex gap-1 flex-wrap my-1'>
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="px-3 sm:px-4 py-1 sm:py-1 text-lg sm:text-xl border rounded-full hover:bg-orange-500 whitespace-nowrap font-bold sm:h-8"
            style={{
              borderColor: 'var(--background-color)',
              color: 'var(--background-color)',
            }}
          >
            {link.text}
          </Link>
        ))}
        {props.user != null ? (
          <Link
            key={11}
            href={'/profile'}
            className="flex items-center pr-1 pt-1 pb-1 pl-3 text-lg sm:text-xl border rounded-full hover:bg-orange-500 whitespace-nowrap font-bold mx-1"
            style={{
              borderColor: 'var(--background-color)',
              color: 'var(--background-color)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="pr-2">
              {isHovered ? "View Profile" : 'Hi ' + props.user.name.split(" ")[0] + '!'}
            </span>
            <div className="h-7 w-7 rounded-full object-cover border-black border-2">
              <img
                src={`https://source.boringavatars.com/marble/100/${props.user.id}?colors=EF233C,FED4E7,313638,003E1F`}
                alt="Profile Picture"
              />
            </div>
          </Link>
        ) : (
          <Link
            key={12}
            href={'/auth'} // replace with your logout link
            className="px-3 py-1 text-lg sm:text-xl border rounded-full hover:bg-orange-500 whitespace-nowrap text-center font-bold"
            style={{
              borderColor: 'var(--background-color)',
              color: 'var(--background-color)',
            }}
          >
            {'Login'}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
