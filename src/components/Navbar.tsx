import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface LinkProps {
  href: string;
  text: string;
}

interface NavbarProps {
  links?: LinkProps[];
  title?: string;
}

const defaultLinks: LinkProps[] = [
  { href: '/scheduler', text: 'Scheduler' },
  { href: '/outreach', text: 'Outreach' },
  { href: '/writing', text: 'Writing' },
  { href: '/Portfolio', text: 'Portfolio' },
  { href: '/newsletter', text: 'Newsletter' },
];

const Navbar: React.FC<NavbarProps> = ({ links = defaultLinks }) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScrollWidth, setMaxScrollWidth] = useState(0);
  const [maxScrollAmt, setMaxScrollAmt] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    setIsScrollable(navbar.scrollWidth > navbar.clientWidth);
    setMaxScrollWidth(navbar.clientWidth);
    setMaxScrollAmt(navbar.scrollWidth);
  }, []);

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.onscroll = () => {
      setScrollPosition(navbar.scrollLeft);
    };
  }, []);

  return (
    <nav className={`flex items-center justify-between bg-white shadow-lg ${scrollPosition > 0 ? "scrolled-left" : ""} ${scrollPosition >= maxScrollAmt - maxScrollWidth ? "scrolled-right" : ""}`}>
      <Link href="/" className="px-2 sm:px-4 py-1 sm:py-2 text-2xl sm:text-4xl font-bold text-black mr-4 hover:underline rounded decoration-orange-500 decoration-4">MakeIt<span className="text-orange-500">Ai</span>For.<span className="text-orange-500">Me</span></Link>
      <div className="relative w-full h-full overflow-hidden hor-scroll-wrap">
        <div id="navbar" className="flex gap-2 sm:gap-2 overflow-x-auto justify-start scrollbar-hide hor-scroll pr-8 pl-8">
          {links.map((link, index) => (
            <Link key={index} href={link.href} className={"px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl border rounded-full hover:bg-orange-500 whitespace-nowrap text-center font-bold"} style={{ borderColor: 'var(--background-color)', color: 'var(--background-color)' }}>
              {link.text}
            </Link>
          ))}
        </div>
        {isScrollable && <div className="navbar-fade"></div>}
      </div>
    </nav>
  );
};

export default Navbar;