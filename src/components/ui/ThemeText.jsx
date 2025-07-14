// src/components/ui/ThemeText.jsx
const ThemeText = ({ text }) => {
  return (
    <p className="text-gray-800 dark:text-gray-300 transition-all">{text}</p>
  );
};

export default ThemeText;
