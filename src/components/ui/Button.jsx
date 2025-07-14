// src/components/ui/Button.jsx
const Button = ({ children, full = false, ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md text-black bg-blue-600 hover:bg-blue-700 transition font-semibold ${
        full ? "w-full" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
