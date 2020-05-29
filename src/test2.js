import React from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom';

export default function PeopleData() {
  const [people, setPeople] = useState([]);
    
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
      const res = fetch(url);
      const data = res.json();
      console.log(data);
      setPeople(data);

    }
    catch(err){
      console.log(err);
    }
  ;
  
  return (

    <div>
      {people.map(data =>
      <div key={data.id}>
      <div>{data.name}</div>
      <div>{data.company.name}</div>
      </div>

    )}
  </div>
  )
}


ReactDOM.render(<PeopleData />, document.getElementById('root'));