import "./style.css";
import { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import { API_URL } from "../../api/config";


const Search = ({userId, updateHistory, token }) => {
 
  const loadRef = useRef(null)
  const errorAlertRef = useRef(null)


  const [url, setUrl] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!isValidUrl(url)){
      setError("Invalid Url")
      errorAlertRef.current.style.display= 'block'
      setTimeout(() => {
        errorAlertRef.current.style.display= "none"
      }, 3000);
      return
    }

    loadRef.current.style.display = "inline"

    const bodyDate = {
      url : "http://"+url,
      userId : userId
   }
    const response = await fetch(`${API_URL}/wordcount`, {
      method : "POST",  
      headers: { 'Content-Type': 'application/json',
                 "authorization" : "Bearer " + token
               },
      body : JSON.stringify(bodyDate)
    })

    loadRef.current.style.display ='none'
    const data = await response.json();
    if (!response.ok) {
      console.log("Error in fetch operation")
      setError(data.error)
      errorAlertRef.current.style.display= "block"
      setTimeout(() => {
        errorAlertRef.current.style.display= "none"
      }, 3000);
    }else{
      updateHistory(data)
    }
    
    console.log(data)
  };


  function isValidUrl(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(url);
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center pb-4 pt-4">

      <div ref={errorAlertRef} style={{display: "none"}} class="alert alert-danger alert-dismissible p-2 text-center"  role="alert">
        {error}
      </div>
      <form onSubmit={handleSubmit} className="w-50 text-center">
        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            
          </label>
          <input
            type="text"
            className="form-control"
            id="url"
            placeholder="Enter URL | eg: google.com "
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-50">
        <i ref={loadRef} style={{display: "none"}} class="fa fa-spinner fa-spin me-2"></i>
          Start Crawling
        </button>
      </form>
    </div>
  );
  
};

export default Search;
