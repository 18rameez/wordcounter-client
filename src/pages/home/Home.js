import NavBar from "../../components/nav/NavBar";
import './style.css'
import Search from "../../components/search/Search";
import History from "../../components/history/History";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../api/config";
import jwtDecode from "jwt-decode";


const Home = () => {
  
  const [history, setHistory] = useState([]);

  let userId = null
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
   
  }

  const handleClick = (newData, type = "search") => {

    //when a history is deleted, list get updated
    if(type === 'delete'){
      setHistory(newData);
    }else {
      //when a crawling complete, given url will be added to history list
      setHistory([...history, newData]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch( `${API_URL}/wordcount/history/${userId}`, {
        headers : {"authorization" : "Bearer " + token}
      });
      const data = await response.json();
      console.log(data)
      setHistory(data);
     // setTotalPages(Math.ceil(data.totalCount / pageSize));
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div >
       <Search userId={userId}  updateHistory={handleClick} token={token}/>
       <History history={history}  updateHistory={handleClick} token={token}/>
      </div>
    </>
  );
};

export default Home;
