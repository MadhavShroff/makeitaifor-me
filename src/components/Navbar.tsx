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
  { href: '/about', text: 'About' },
  { href: '/products', text: 'Products' },
  { href: '/contact', text: 'Contact Me' },
  { href: '/newsletter', text: 'Newsletter' },
];

const Navbar: React.FC<NavbarProps> = ({ links = defaultLinks, title = 'MakeItAiFor.Me' }) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScrollWidth, setMaxScrollWidth] = useState(0);
  const [maxScrollAmt, setMaxScrollAmt] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if(!navbar) return;
    setIsScrollable(navbar.scrollWidth > navbar.clientWidth);
    setMaxScrollWidth(navbar.clientWidth);
    setMaxScrollAmt(navbar.scrollWidth);
  }, []);

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if(!navbar) return;
    navbar.onscroll = () => {
      setScrollPosition(navbar.scrollLeft);
    };
  }, []);

  return (
    <nav className={`flex items-center justify-between p-4 sm:p-6 bg-white shadow-lg ${scrollPosition > 0 ? "scrolled-left" : ""} ${scrollPosition >= maxScrollAmt - maxScrollWidth ? "scrolled-right" : ""}`}>
      <Link href="/" className="px-2 sm:px-4 py-1 sm:py-2 text-xl sm:text-2xl font-bold text-black mr-4 hover:underline rounded decoration-orange-500 decoration-4">{title}</Link>
      <div className="relative w-full overflow-hidden hor-scroll-wrap">
        <div id="navbar" className="flex gap-2 sm:gap-4 overflow-x-auto justify-start scrollbar-hide hor-scroll ml-8 pr-8">
          {links.map((link, index) => (
            <Link key={index} href={link.href}>
              <a style={{ borderColor: 'var(--background-color)', color: 'var(--background-color)' }} className="px-3 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl border rounded-full hover:bg-orange-500 whitespace-nowrap text-center font-bold">
                {link.text}
              </a>
            </Link>
          ))}
        </div>
        {isScrollable && <div className="navbar-fade"></div>}
      </div>
    </nav>
  );
};

export default Navbar;