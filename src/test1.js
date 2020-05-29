import React from 'react';
import {useEffect, useState} from 'react';

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
      setLoading(false);
      console.log(fetchData);
    }
    fetchData()
  }, [url]);
// This fixed my error, https://github.com/facebook/react/issues/14920

// Mike, I found a solution to the error I was receiving with this file (already fixed).  The link above walks you through the fix. I kind of understand it, but need some help. It appears to be a scoping issue.

  return {loading,data};
};

 export default function App() {
  
  const {loading,data} = useFetch("https://jsonplaceholder.typicode.com/users/");

  return (
    <div>
      {loading ? <div>Loading...</div> :
        <div>
          {data.map(data => <div key={data.id}>
            <li>Name: {data.name}</li>
            <li>Username: {data.username}</li>
            <li>Email: {data.email}</li>
            <li>Street: {data.address.street}</li>
            <li>Suite: {data.address.suite}</li>
            <li>City: {data.address.city}</li>
            <li>Zip Code: {data.address.zipcode}</li>
            <li>Phone: {data.phone}</li>
            <br></br>
          </div>
          )}
          </div>
        } 
      </div>
  )
}

