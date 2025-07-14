// src/pages/MoviesPage.jsx
import ThemeCard from "../components/ui/ThemeCard";
import BackgroundSection from "../components/ui/BackgroundSection";
import ThemeButton from "../components/ui/ThemeButton";

const MoviesPage = () => {
  const movieData = {
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    imageUrl:
      "https://image.tmdb.org/t/p/original/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
  };

  return (
    <BackgroundSection>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ThemeCard {...movieData} />
        <ThemeCard {...movieData} />
        <ThemeCard {...movieData} />
      </div>

      <div className="mt-12 text-center">
        <ThemeButton
          label="Add to Watchlist"
          onClick={() => alert("Movie added")}
        />
      </div>
    </BackgroundSection>
  );
};

export default MoviesPage;
