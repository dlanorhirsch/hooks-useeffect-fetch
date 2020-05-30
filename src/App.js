import React from 'react';
// import './App.css';
import useFetch from "./test1";
// import fetchData from "./test1";
// import PeopleData from "./test2";
import FetchData from "./test3";

export class Application extends React.Component {
  render(){
    return(
      <>
        <h3>TEST 1</h3> 
          <div><useFetch /></div>

        <h3>TEST 2</h3>
          {/* <div><PeopleData /></div> */}
        
        <h3>TEST 3</h3>
          <div><FetchData /></div>
      </>
   
    )
  }
}





