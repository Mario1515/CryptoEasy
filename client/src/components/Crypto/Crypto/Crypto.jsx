import React from 'react'

import Table from "../Table/Table";
import Filters from '../Filters/Filters';
import SinglePageHead from '../../SinglePageHead/SingePageHead';
import Pagination from "../Pagination/Pagination";
import Search from '../Search/Search';

const Crypto = () => {
  return (
    <section className="crypto-section">
      <div className="crypto-header">
        <h2>Crypto Data</h2>
        <p>Explore the latest cryptocurrency information</p>
      </div> 
      <SinglePageHead pageInfo={{name:'Crypto Prices', slug:'crypto' }} />
      <Filters />
      <Search />
      <Table />
     <Pagination />
    </section>
  );
};

export default Crypto;