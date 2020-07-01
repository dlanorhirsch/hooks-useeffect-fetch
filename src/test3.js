import React from 'react';
import {useState, useEffect} from 'react';

function FetchData() {
  const [people, setPeople] = useState([]);

  async function fetchPeople(){
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const json = await response.json();
  setPeople(json);
  }
  useEffect(() => {
    fetchPeople();
  }, []);
 
return (
    <div>
      {people.map(data => <div key={data.id}>
        <ul className="list">
          <li className="header">
            <strong>Name:</strong> {data.name}</li>
          <div className="body">  
            <li><strong>Company:</strong> {data.company.name}</li>
            <li><strong>User Name: </strong> {data.username}</li>
            <li><strong>Email: </strong> {data.email}</li>
            <li><strong>Phone: </strong>{data.phone}</li>
          </div>
        </ul>
        </div>   
      )}
    </div>
  );
};
export default FetchData;


// <li className="address"><strong>Address: </strong></li>
//   <div className="body">
//     <li><strong>Street:</strong> {data.addrestreet}</li>
//     <li><strong>Suite: </strong> {data.addresuite}</li>
//     <li><strong>City: </strong> {data.addrecity}<br/></li>
//     <li><strong>Zip Code:</strong> {data.addrezipcode}</li>
//     </div>