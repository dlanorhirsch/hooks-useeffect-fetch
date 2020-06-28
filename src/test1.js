import React from 'react';
import{ useEffect, useState } from 'react';


// useFetch needs to be moved into the scope of the useEffect API, I think!


const UseFetch = (url) => {
  
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/users'
    const fetchData = async () => {
      setIsLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          setData(result)
          setIsLoading(false)
        })
    }

  fetchData()
  }, [url])

  return (
      <div>
        {/* <div>{isLoading}</div>
        {data.map(item => <div key={item.id}>
        <div>{item.name}</div> */}

      </div>
      )}
    </div>
  );
}



export default UseFetch;