/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cognitoHostedUI } from "@/utils/constants";
import { getGuestAccess } from "@/utils/fetches";
import { User } from "@/utils/types";

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
  // { href: '/scheduler', text: 'Scheduler' },
  // { href: '/outreach', text: 'Outreach' },
  // { href: '/writing', text: 'Content Writing' },
  { href: "/chat", text: "Go To Chat →" },
  { href: "/documents", text: "Manage Docs" },
  { href: "/blog", text: "Blog" },
  // { href: '/newsletter', text: 'Newsletter' },
];

const Navbar: React.FC<NavbarProps> = (props) => {
  const links = props.links ? props.links : defaultLinks;
  const [isScrollable] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav
      className={`inline-flex items-center bg-orange-500 px-1 flex-wrap rounded-full navsm:rounded mt-3 mx-3`}
    >
      <div className="flex gap-1 flex-wrap my-1">
        <Link
          href="/"
          className="px-2 pr-4 pt-1 text-2xl font-bold text-black hover:underline decoration-black"
        >
          MakeIt<span className="text-white">Ai</span>For.
          <span className="text-white">Me</span>
        </Link>
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
        {props.user != null ? (
          <Link
            key={11}
            href={"/profile"}
            className="flex items-center pr-1 pt-1 pb-1 pl-3 text-lg text-black sm:text-xl border border-black rounded-full bg-white hover:bg-black 
             hover:text-white whitespace-nowrap font-bold mx-1 sm:h-8 sm:py-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="pr-2">
              {isHovered
                ? "View Profile"
                : "Hi " + props.user.name.split(" ")[0] + "!"}
            </span>
            <div className="h-7 w-7 rounded-full object-cover">
              <img
                src={`https://source.boringavatars.com/marble/100/${props.user.userId}?colors=EF233C,FED4E7,313638,003E1F`}
                alt="Profile Picture"
              />
            </div>
          </Link>
        ) : (
          <>
            <Link
              key={12}
              href={cognitoHostedUI}
              className="px-3 py-1 text-lg sm:text-xl border border-black text-[var(--background-color)] 
              rounded-full bg-white hover:bg-black hover:text-white whitespace-nowrap text-center font-bold sm:h-8 sm:py-0"
            >
              {"Login"}
            </Link>
            <Link
              key={12}
              href={"#"}
              onClick={() => getGuestAccess()}
              className="px-3 py-1 text-lg sm:text-xl border border-black text-[var(--background-color)] 
              rounded-full bg-white hover:bg-black hover:text-white whitespace-nowrap text-center font-bold sm:h-8 sm:py-0"
            >
              {"Continue as Guest"}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
