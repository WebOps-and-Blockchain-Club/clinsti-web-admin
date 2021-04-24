import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(!url){return}
    console.log(url);
    const source = axios.CancelToken.source();
    axios.get(url, {
      cancelToken: source.token
     })
    .then(res => {
      if (res.status !== 200 && res.status !== 404) { // error coming back from server
        console.log(res.data)
        throw Error('could not fetch the data for that resource');
      }
      if(res.status === 404){
        return null
      }
      return res.data;
    })
    .then(data => {
      setIsPending(false);
      setData(data);
      setError(null);
    })
    .catch(err => {
      if (!axios.isCancel(err)) {
        setIsPending(false);
        setError(err.message);
        if(err.response.status===404){
          setError('no data')
        }
      }
    })

    // abort the fetch
    return () => source.cancel();
  }, [url])

  return { data, isPending, error };
}
 
export default useFetch;