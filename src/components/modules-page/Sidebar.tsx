import { useEffect, useState } from "react";

interface SidebarLink {
  id: string;
  label: string;
  href: string;
}

const links: SidebarLink[] = [
  { id: "section1", label: "Module 1", href: "#section1" },
  { id: "section2", label: "Module 2", href: "#section2" },
  { id: "section3", label: "Module 3", href: "#section3" },
  { id: "section4", label: "Module 4", href: "#section4" },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    <div>
      {/* Floating Button */}
      {!isOpen && (
        <button
          className="fixed top-4 right-4 bg-black text-white border py-1 rounded px-3 md:hidden"
          onClick={toggleMenu}
        >
          ☰
        </button>
      )}

      {/* Sidebar for larger screens */}
      <div className="hidden md:block md:fixed md:top-0 md:left-0 md:h-full md:w-48 md:bg-gray-800 md:text-white md:p-3">
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

      {/* Popup Menu for small screens */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-start p-6 md:hidden">
          <button className="text-white mb-4" onClick={toggleMenu}>
            ✕
          </button>
          <h1 className="text-2xl mb-4 text-white text-right w-full">Modules</h1>
          <div className="text-right w-full">
            <ul>
              {links.map((link) => (
                <li
                  key={link.id}
                  className={`mb-4 ${
                    activeSection === link.id ? "text-red-500" : "text-white"
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
      )}
    </div>
  );
};

export default Sidebar;
