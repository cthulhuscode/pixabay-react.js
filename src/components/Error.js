import React from "react";
import PropTypes from "prop-types";

const Error = ({ msg }) => {
  return (
    <div className="badge badge-danger text-wrap ml-5 p-2" role="alert">
      {msg}
    </div>
  );
};

Error.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Error;
