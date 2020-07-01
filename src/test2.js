import React, { useEffect } from 'react';
import {useState} from 'react';

function PeopleData() {
  const [data, setData] = useState([]);

      function GetData(){
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(response => setData(response))


// The then()function takes 2 callback function parameters: onFullfilled(), onRejected().

      }
      console.log(data) 

      useEffect(() => {
        GetData();
      }, []);
      
  return (
    <div>
      {data.map(item => <div key={item.id}>
        <div>
          <li>{item.name}</li>
          {/* <li>{item.company}</li>
          <li>{item.phone}</li>
          <li>{item.email}</li> */}
        </div>
      </div>)}
    </div>

  )
}
export default PeopleData;







    // const response = fetch('https://jsonplaceholder.typicode.com/users');
    // const json = response.json();
    // setData(json);

// Solution: Fetching data with hooks is a side effect requiring useEffect to manage.