import React from 'react'
import Table from "../Table/Table";
import Filters from '../Search/Filters';
import SinglePageHead from '../../SinglePageHead/SingePageHead';

const Crypto = () => {
  return (
    <section className="crypto-section">
      <div className="crypto-header">
        <h2>Crypto Data</h2>
        <p>Explore the latest cryptocurrency information</p>
      </div>
      <SinglePageHead pageInfo={{name:'Crypto Prices', slug:'crypto' }} />
      <Filters />
      <Table />
    </section>
  );
};

export default Crypto;