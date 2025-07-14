// src/components/ui/BackgroundSection.jsx
const BackgroundSection = ({ children }) => {
  return (
    <div className="min-h-screen bg-black dark:bg-gray-900 transition-all">
      <div className="container mx-auto px-4 py-12">{children}</div>
    </div>
  );
};

export default BackgroundSection;
