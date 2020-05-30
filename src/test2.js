import React from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom';

function PeopleData() {
  const [data, setData] = useState([]);
    
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
      const response = fetch(url);
      const json = response.json;
      setData(json);

    }
    catch(err){
      console.log(err);
    }
 
  
  return (
      
    <div>
      {data.map(data =>
      <div key={data.id}>
      <div>{data.name}</div>
      <div>{data.company.name}</div>
      </div>

    )}
  </div>
  )
}


ReactDOM.render(<PeopleData />, document.getElementById('root'));
export default PeopleData;