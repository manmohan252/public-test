import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z" />
  </svg>
);

export default function FooterIcon() {
  const navLinks = [
    { label: "Site map", href: "#" },
    { label: "Help", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "Safety and Security", href: "#" },
    { label: "Terms of Use", href: "/TreamOfUse" }, // Updated route
    { label: "Privacy Policy", href: "/privacyPolicy" },
  ];

  const socialLinks = [
    { icon: <FaFacebook className="w-4 h-4" />, href: "#", label: "Facebook" },
    { icon: <FaTwitter className="w-4 h-4" />, href: "#", label: "X (Twitter)" },
    { icon: <FaInstagram className="w-4 h-4" />, href: "#", label: "Instagram" },
    { icon: <TikTokIcon />, href: "#", label: "TikTok" },
    { icon: <FaYoutube className="w-4 h-4" />, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Nav links */}
          <nav className="flex items-center flex-wrap gap-0">
            {navLinks.map((link, index) => (
              <span key={link.label} className="flex items-center">
                {link.label === "Terms of Use" ? (
                  <Link
                    to={link.href}
                    className="text-sm text-blue-900 hover:text-gray-900 hover:underline transition-colors px-3 first:pl-0 ml-5"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="text-sm text-blue-900 hover:text-gray-900 hover:underline transition-colors px-3 first:pl-0 ml-5"
                  >
                    {link.label}
                  </a>
                )}
                {index < navLinks.length - 1 && (
                  <span className="text-gray-300 text-sm select-none">|</span>
                )}
              </span>
            ))}

            {/* New updates badge */}
            <span className="ml-3">
              <span className="inline-block text-sm text-gray-700 border border-gray-400 rounded-full px-3 py-0.5 font-medium">
                New updates
              </span>
            </span>
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-500 leading-relaxed">
          Copyright &copy; 2000&ndash;<strong>2026</strong> Rightmove Group
          Limited. All rights reserved. Rightmove prohibits the scraping of its
          content. You can find{" "}
          <a
            href="#"
            className="font-bold text-gray-700 hover:underline"
          >
            further details here
          </a>
          .
        </p>
      </div>
    </footer>
  );
}