// src/components/ui/Input.jsx
const Input = ({ label, ...props }) => {
  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={props.name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
