// src/components/ui/ThemeButton.jsx
const ThemeButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-blue-600 text-black font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
    >
      {label}
    </button>
  );
};

export default ThemeButton;
