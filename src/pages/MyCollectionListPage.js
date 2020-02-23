import React, { useState } from 'react';

export default (props) => {
  const [collections, setCollections] = useState([]);


  return (
    <div className="container my-collection-list-page">
      <section className="row">
        <div className="col">
          <h2>My Collections</h2>


        </div>
      </section>
    </div>
  );
};
