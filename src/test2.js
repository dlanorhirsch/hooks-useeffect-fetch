import React from 'react';
import {useState} from 'react';


function PeopleData() {
  const [data, setData] = useState([]);
    
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
      const response = fetch(url);
      const json = response.json;
      setData(json);
      console.log(data)

    }
    catch(err){
      console.log(err);
    }
    
  return (
    <div>
      {data.map(data => <div key={data.id}>
        <div>{data.name}</div>
        </div>)}
    </div>


  )
}

export default PeopleData;