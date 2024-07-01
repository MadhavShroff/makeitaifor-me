import { useEffect, useState } from "react";

interface SidebarLink {
  id: string;
  label: string;
  href: string;
}

const links: SidebarLink[] = [
  { id: "section1", label: "Section 1", href: "#section1" },
  { id: "section2", label: "Section 2", href: "#section2" },
  { id: "section3", label: "Section 3", href: "#section3" },
  { id: "section4", label: "Section 4", href: "#section4" },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  const handleScroll = () => {
    const sections = links.map((link) => document.getElementById(link.id));
    let currentSection = "";

    for (const section of sections) {
      if (section) {
        const rect = section?.getBoundingClientRect();
        if (
          rect &&
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          currentSection = section.id;
          break;
        }
      }
    }

    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 h-full w-48 bg-gray-800 text-white p-3">
      <h1 className="text-2xl mb-4">Modules</h1>
      <div className="ml-2">
        <ul>
          {links.map((link) => (
            <li
              key={link.id}
              className={`mb-4 ${
                activeSection === link.id ? "text-red-500" : ""
              }`}
            >
              <a href={link.href} className="hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
