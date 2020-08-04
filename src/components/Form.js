import React, { useState } from "react";
import PropTypes from "prop-types";

// Components
import Error from "./Error";

const Form = ({ setQuery }) => {
  const [query, setFormQuery] = useState("");
  const [error, setError] = useState(false);

  // onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    if (query.trim() === "") {
      setError(true);
      return null;
    }
    setError(false);

    // Send the query
    setQuery(query);
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Buscar imagen"
        aria-label="Search"
        onChange={(e) => setFormQuery(e.target.value)}
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Buscar
      </button>
      {error ? <Error msg="Agrega un término de búsqueda" /> : null}
    </form>
  );
};

Form.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default Form;
