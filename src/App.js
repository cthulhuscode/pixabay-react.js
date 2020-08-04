import React, { useState, useEffect } from "react";

// Components
import Form from "./components/Form";
import ImagesList from "./components/ImagesList";

function App() {
  // useState
  const [query, setQuery] = useState("imagen");
  const [images, setImages] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastQuery, setLastQuery] = useState(query);

  // when query changes
  // useEffect
  useEffect(() => {
    const makeSearch = async () => {
      if (query === "") return;

      // Reset pagination when new search is done
      if (query !== lastQuery) setActualPage(1);

      setLastQuery(query);

      const imagesPerPage = 30;
      const API_KEY = "17768132-9f478644227ad1781abab1a1d";
      const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&per_page=${imagesPerPage}&page=${actualPage}`;

      const result = await fetch(URL);
      const data = await result.json();

      const total_pages = Math.ceil(data.totalHits / imagesPerPage);
      setTotalPages(total_pages);

      setImages(data.hits);

      // Do scroll to up
      const jumbotron = document.getElementById("jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };
    makeSearch();
    // eslint-disable-next-line
  }, [query, actualPage]);

  // Back Page
  const backPage = () => {
    const actual_page = actualPage - 1;

    if (actual_page === 0) return;

    setActualPage(actual_page);
  };

  // Next Page
  const nextPage = () => {
    const actual_page = actualPage + 1;

    if (actual_page > totalPages) return;

    setActualPage(actual_page);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark"
        id="jumbotron"
      >
        <a href="#!" className="navbar-brand mr-5">
          Pixabay Buscador
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse ml-5"
          id="navbarSupportedContent"
        >
          <Form setQuery={setQuery} />
        </div>
      </nav>
      <div className="container">
        <div className="row justify-content-center">
          <ImagesList images={images} />

          {actualPage !== 1 ? (
            <button
              type="button"
              className="btn btn-info mr-1"
              onClick={backPage}
            >
              &laquo; Back
            </button>
          ) : null}

          {actualPage !== totalPages ? (
            <button type="button" className="btn btn-info" onClick={nextPage}>
              Next &raquo;
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
