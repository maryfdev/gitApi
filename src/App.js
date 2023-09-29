import React, { useState, useEffect, useCallback} from 'react';
import './App.css';
import GistsList from './components/GistsList';

function App() {

  ///Defining the Query for the Url
  const apiUrl = 'https://api.github.com/gists/public';
  const sinceTimestamp = '2022-01-01T12:00:00Z';
  const perPage = 30;
  const page = 2;
  const url = `${apiUrl}?since=${sinceTimestamp}&per_page=${perPage}&page=${page}`
  ////End of Defining the Query for the Url

  const [gists,setGists] = useState([]);
  const[isLoading,setIsLoading] = useState(false);
  const[error,setError] = useState(null);

  
  // For sending http request either we can use Axios library or built-in method fetch
  const fetchHandler = useCallback (async () =>{
    setIsLoading(true);
    setError(null); // clear any previous errors that we might have
    
    try{
      const response = await fetch (url);
      
      if(!response.ok){ // if there is some errors in the response
        throw new Error ('Something Went Wrong');
      }
      
      const data = await response.json(); // json to object
      setGists(data);
      setIsLoading(false);
    }catch (error){
      setError(error.message); // When an error happen in try part the code after that doesnt run and instead the code in catch will run
    }finally{
      setIsLoading(false); // the code in finally will always run 
      // here we put the setIsLoading to false because no matter we are getting the successful response or 
      // an error response (in both situations we are done loading)
    }
  },[url])
  

  useEffect (() =>{
    fetchHandler();
  },[fetchHandler])


  
  // Showing the result in the page
  let content = <p>No gists Found</p>; //In case there is no gists in the API
  
  if(gists.length>0){
    content = <GistsList lists={gists}/>
  }
  
  if (error) {
    content = {error} //in case we have an error in the response of the fetching the API show the error message
  }

  if(isLoading){
    content = <p>Loading ...</p>
  }
  ////////////////////////////////////////////////


  return (
    <React.Fragment>
      <section>
         {content}
      </section>
    </React.Fragment>
  );
}

export default App;
