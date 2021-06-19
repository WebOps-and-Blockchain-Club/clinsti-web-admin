import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url,r) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const baseLink = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if(!url){return}
    const source = axios.CancelToken.source();
    axios.get(`${baseLink}${url}`, {
      cancelToken: source.token
     })
    .then(res => {
      if (res.status !== 200 && res.status !== 404) { // error coming back from server
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
        setIsPending(false)
          if(err && err.response && err.response.status === 404){
            setError('No Data Found')
            return setData(null)

          }
        setError(err.message);
      }
    })

    // abort the fetch
    return () => source.cancel();
  }, [url,r,baseLink])

  return { data, isPending, error };
}
 
export default useFetch;
