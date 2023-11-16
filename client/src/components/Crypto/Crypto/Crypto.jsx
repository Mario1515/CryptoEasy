import React from 'react'
import Table from "../Table";
import Filters from '../../Search/Filters';

// Crypto.jsx

const Crypto = () => {
  return (
    <section className="crypto-section">
      <div className="crypto-header">
        <h2>Crypto Data</h2>
        <p>Explore the latest cryptocurrency information</p>
      </div>
      <Filters />
      <Table />
    </section>
  );
};

export default Crypto;