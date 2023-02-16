import React, { useState, useEffect, useCallback } from "react";
import "./Home.css";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from "../../config";
import HeroImage from "../../components/HeroImage/HeroImage";
import SearchBar from "../../components/SearchBar/SearchBar";
import FourColGrid from "../../layouts/FourColGrid/FourColGrid";
import MovieThumb from "../../components/MovieThumb/MovieThumb";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [heroImage, setHeroImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchItems = useCallback(
    async (endpoint) => {
      setLoading(true);
      const result = await (await fetch(endpoint)).json();
      setMovies((prevMovies) => [...prevMovies, ...result.results]);
      setHeroImage(heroImage || result.results[0]);
      setCurrentPage(result.page);
      setTotalPages(result.total_pages);
      setLoading(false);
    },
    [heroImage]
  );

  const loadMoreItems = () => {
    let endpoint = "";
    setLoading(true);

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
        currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${
        currentPage + 1
      }`;
    }
    fetchItems(endpoint);
  };

  const searchItems = (searchTerm) => {
    let endpoint = "";
    setMovies([]);
    setLoading(true);
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    fetchItems(endpoint);
  };

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchItems(endpoint);
  }, [fetchItems]);

  return (
    <div className="rmdb-home">
      {heroImage && (
        <div>
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
            title={heroImage.original_title}
            text={heroImage.overview}
          />
          <SearchBar searchItems={searchItems} />
        </div>
      )}
      <div className="rmdb-home-grid">
        <FourColGrid
          header={searchTerm ? "Search Result" : "Popular Movies"}
          loading={loading}
        >
          {movies.map((movie, i) => (
            <MovieThumb
              key={i}
              clickable={true}
              image={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                  : "./images/no_image.jpg"
              }
              movieId={movie.id}
              movieName={movie.original_title}
            />
          ))}
        </FourColGrid>
        {loading && <Spinner />}
        {currentPage < totalPages && !loading && (
          <LoadMoreBtn loadMoreItems={loadMoreItems} />
        )}
      </div>
    </div>
  );
};

export default Home;
