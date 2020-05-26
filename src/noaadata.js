import React from 'react';
import ReactDOM from 'react-dom';

class NoaaData extends React.Component{
  contructor(){
    super();
    this.state = [];
  }
  componentDidMount(){
    fetch("https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets")
    .then(response => response.json())
    .then(data => console.log(data))
  }
  ]
}
export default NoaaData