import React from 'react';
import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

export default () => {
  const [people, setPeople] = useState(null);

  useEffect(() => {
    async function App(){

    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setPeople(data);
  }}, []);

return (
  <div className="container-fluid">
    <div className="row">
      {
        people.map(data => 
        <div key={data.id}>
        <div className="list">
          <li className="header">{data.name}</li>
        <div className="body">  
          <li><strong>Company:</strong> {data.company.name}</li>
          <li><strong>User Name: </strong> {data.username}</li>
          <li><strong>Email: </strong> {data.email}</li>
          <li><strong>Phone: </strong>{data.phone}</li>
        </div>
          <li className="address"><strong>Address: </strong></li>
        <div className="body">
          <li><strong>Street:</strong> {data.address.street}</li>
          <li><strong>Suite: </strong> {data.address.suite}</li>
          <li><strong>City: </strong> {data.address.city}<br/></li>
          <li><strong>Zip Code:</strong> {data.address.zipcode}</li>
        </div>   
        </div>
        </div>
       )
      }
    </div>
   </div>
  );
};

// ReactDOM.render(<App />, document.getElementById('root'));