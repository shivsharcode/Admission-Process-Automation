import { useRef, useEffect } from "react";

import gsap from 'gsap'


function Header() {
  const navRefs = useRef([]);

  useEffect(() => {
    navRefs.current.forEach((link) => {
      // Select each underline element inside the link
      const underline = link.querySelector(".underline");

      // GSAP hover animation
      gsap.set(underline, { scaleX: 0, transformOrigin: "left" }); // Initially set the underline to zero width

      link.addEventListener("mouseenter", () => {
        gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.inOut" }); // Expand underline on hover
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.inOut" }); // Shrink underline on hover out
      });
    });
  }, []);

  return (
    <header className="flex justify-between items-center p-5 px-10 bg-black">
      <div className="text-2xl font-bold text-white">ABESEC</div>
      <nav className="flex space-x-7 text-xs">
        {["ABOUT", "COMPANIES", "HOW IT WORKS", "OPPORTUNITIES", "CAREERS", "COMMUNITY"].map((item, index) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            ref={(el) => (navRefs.current[index] = el)}
            className="relative group text-white hover:text-gray-400"
          >
            {item}
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-current underline"></span>
          </a>
        ))}
      </nav>
      <button className="bg-white text-black px-7 py-2 rounded-full font-semibold hover:bg-gray-300">
        APPLY →
      </button>
    </header>
  );
}

export default Header;
