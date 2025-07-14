import { useNavigate } from "react-router-dom";

const ThemeCard = ({ title, imageUrl, description, onSave, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer hover:shadow-lg transition-transform hover:scale-105"
      onClick={() => navigate(`/movies/${id}`)}
    >
      <img
        src={imageUrl}
        alt={title}
        className="rounded-t-lg h-[300px] w-full object-cover"
      />
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
        {onSave && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent navigation
              onSave();
            }}
            className="text-blue-600 hover:underline text-sm mt-2 block"
          >
            Save to Watchlist
          </button>
        )}
      </div>
    </div>
  );
};

export default ThemeCard;
