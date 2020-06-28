import React, { useEffect } from 'react';
import {useState} from 'react';


function PeopleData() {
  const [data, setData] = useState([]);
 

    // const response = fetch('https://jsonplaceholder.typicode.com/users');
    // const json = response.json();
    // setData(json);

   
      function fetchData(){
  
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(response => setData(response))
       
      }
      // console.log(data) 

      useEffect(() => {
        fetchData();
      }, []);
      
    
      
           
  return (
    <div>
      {data.map(item => <div key={item.id}>
        <div>{item.name}</div>
        <div>{item.company}</div>
        {/* <div>{item.email}</div>
        <div>{item.phone}</div> */}
        </div>)}
    </div>

  )
}

export default PeopleData;

// Solution: Fetching data with hooks is a side effect requiring useEffect to manage.