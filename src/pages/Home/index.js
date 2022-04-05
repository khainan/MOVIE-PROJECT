import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

// styles
import './Home.scss';

// components
import MovieCard from '../../components/MovieCard/MovieCard';

export default function Home() {
  const [movieLists, setMovieLists] = useState([]);
  const [page, setPage] = useState(1);

  const handleInfiniteScroll = async (event) => {
    const { scrollHeight, scrollTop, offsetHeight } = event.currentTarget || {};
    const scrollThreshold = scrollTop + offsetHeight + 1;
    console.log(parseInt(scrollThreshold), scrollHeight);

    if (scrollThreshold > scrollHeight) {
      let newMovies = [...movieLists];
      const url = `https://www.omdbapi.com/?apikey=3fea2cf0&s=star&type=movie&page=${
        page + 1
      }`;
      const data = await axios
        .get(url)
        .then((result) => result.data.Search)
        .catch((err) => err);

      if (data) {
        newMovies = newMovies.concat(data);
        setMovieLists(newMovies);
        setPage((page) => page + 1);
      }
    }
  };

  const handleGetMovies = useCallback(async () => {
    const url = `https://www.omdbapi.com/?apikey=3fea2cf0&s=star&type=movie&page=${page}`;
    const data = await axios
      .get(url)
      .then((result) => result.data.Search)
      .catch((err) => err);
    console.log(data);
    if (data) {
      setMovieLists(data);
    }
  }, []);

  useEffect(() => {
    handleGetMovies();
  }, [handleGetMovies]);

  return (
    <div className="wrapper" onScroll={handleInfiniteScroll}>
      <div className="introduction">
        <h1>Movie App</h1>
      </div>
      <div className="content">
        {movieLists.length ?
          movieLists.map((movie, movieIndex) => (
            <MovieCard movie={movie} key={movieIndex} showDeleteIcon={false} />
          )) : <div>Loading ...</div>}
      </div>
    </div>
  );
}
