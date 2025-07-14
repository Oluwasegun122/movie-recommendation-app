// src/components/layout/Footer.jsx
const Footer = () => {
  return (
    <footer className="text-center text-sm text-gray-500 bg-gray-100 py-4">
      &copy; {new Date().getFullYear()} MovieHub. All rights reserved.
    </footer>
  );
};

export default Footer;
