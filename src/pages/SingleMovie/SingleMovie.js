import React, { useState, useEffect } from "react";
import "./SingleMovie.css";
import { API_KEY, API_URL } from "../../config";
import Navigation from "../../components/Navigation/Navigation";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import MovieInfoBar from "../../components/MovieInfoBar/MovieInfoBar";
import Actor from "../../components/Actor/Actor";
import FourColGrid from "../../layouts/FourColGrid/FourColGrid";
import Spinner from "../../components/Spinner/Spinner";
import { useParams } from "react-router-dom";

const SingleMovie = () => {
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [directors, setDirectors] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const fetchItems = async (endpoint) => {
      try {
        setLoading(true);
        const result = await (await fetch(endpoint)).json();

        if (result.status_code) {
          setLoading(false);
          return;
        }

        setMovie(result);
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        const creditsResult = await (await fetch(creditsEndpoint)).json();
        const directors = creditsResult.crew.filter(
          (member) => member.job === "Director"
        );
        setDirectors(directors);
        setActors(creditsResult.cast);
        setLoading(false);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchItems(endpoint);
  }, [movieId]);

  return (
    <div className="rmdb-movie">
      {movie && (
        <div>
          <Navigation movie={movie.original_title} />
          <MovieInfo movie={movie} directors={directors} />
          <MovieInfoBar
            time={movie.runtime}
            budget={movie.budget}
            revenue={movie.revenue}
          />
        </div>
      )}
      {actors && (
        <div className="rmdb-movie-grid">
          <FourColGrid header={"Actors"}>
            {actors.map((element, i) => {
              return <Actor key={i} actor={element} />;
            })}
          </FourColGrid>
        </div>
      )}
      {!actors && !loading && <h1>No Movie Found!</h1>}
      {loading && <Spinner />}
    </div>
  );
};

export default SingleMovie;
