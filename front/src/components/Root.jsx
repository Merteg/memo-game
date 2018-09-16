import React from 'react';
import App from './App';
import RecordTable from './RecordTable';


const Root = () => {
  return (
    <div className="container">
      <div className="main"><App /></div>
      <div className="side"><RecordTable /></div>
    </div>
  )
}

export default Root;
