import React, { useEffect, useState } from 'react';

function PeopleData() {
  const [data, setData] = useState([]);

      function GetData(){
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(response => setData(response))


// The then()function takes 2 callback function parameters: onFullfilled(), onRejected().

      }
      // console.log(data) 

      useEffect(() => {
        GetData();
      }, []);
      
  return (
    <div>
      {data.map(item => <div key={item.id}>
        <div>
          <ol style={{
            border: "1px solid grey",
            borderRadius: "5px",
            width: "250px",
            }}>
            <li style={{marginTop: "10px"}}>{item.name}</li>
            <li>{item.company.name}</li>
            <li>{item.phone}</li>
            <li style={{marginBottom: "10px"}}>{item.email}</li>
          </ol>
        </div>      </div>)}
    </div>

  )
}
export default PeopleData;







    // const response = fetch('https://jsonplaceholder.typicode.com/users');
    // const json = response.json();
    // setData(json);

// Solution: Fetching data with hooks is a side effect requiring useEffect to manage.