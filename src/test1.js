import React from 'react';
import {useEffect, useState} from 'react';

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, []);

  return {loading,data};
};

 export default function App() {

  const {loading,data} = useFetch("https://jsonplaceholder.typicode.com/todos/1");

  return (
    <div>
      {loading ? <div>Loading...</div> :
      <ul>
       <li>{data.id}</li>
       <li>{data.title}</li>
      </ul>
      }
    </div>
  )
}

