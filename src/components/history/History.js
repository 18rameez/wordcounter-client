import React, { useState, useEffect } from "react";
import { Table, Form, Pagination, Modal, Button } from "react-bootstrap";
import { API_URL } from "../../api/config";



const History = ({history, updateHistory, token}) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 10;

  const handleRowClick = (rowData) => {
    console.log(rowData)
    setShowModal(true);
    setSelectedData(rowData);
  };

  const handleDeleteHistoryById = (historyId) => {

    fetch(`${API_URL}/wordcount/history/${historyId}`, {
      method: 'DELETE',
      headers : {"authorization" : "Bearer " + token}
    })
    .then(response => {
      console.log(response)
      if(response.ok){
       alert("deleted")

       const newHistory = []
      history.forEach(item => {
         if(item._id !== historyId){
           newHistory.push(item)
         }
       })

       console.log(Object.prototype.toString(typeof history))
       updateHistory(newHistory, "delete")
       
      }
    })

  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedData([]);
  };

  const handleFavToggle = (historyId, event) => {

    let state = event.target.style.color === 'red' ? false : true
   
    fetch(`${API_URL}/wordcount/favourite/${historyId}`, {
      method: 'PATCH',
      headers :{"content-type" : "application/json",
                "authorization" : "Bearer " + token
               },
      body : JSON.stringify({state:state})
    })
    .then(response => {
      console.log(response)
      if(response.ok){
       console.log("updated")
       if(state){
        event.target.style.color = 'red'
       }else {
        event.target.style.color = 'black'
       }
       
      }
    })
  }

  function getFavIcon(item,state){

    if(state){
      return (
        <i onClick={(e) => {handleFavToggle(item._id, e)}} style={{color: "red"}} class="fa-solid fa-heart"></i> 
      )
    }else {
      return (
        <i onClick={(e) => {handleFavToggle(item._id, e)}} style={{color: "black"}} class="fa-solid fa-heart"></i> 
      )
    }
  
  }

  const filteredHistory = history.filter((item) =>
    item.url.toLowerCase().includes(searchText.toLowerCase())
  );

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center m-5 ">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>URL</th>
            <th>Word Count</th>
            <th>External Links</th>
            <th>Media Count</th>
            <th>Fav</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td>
              <Form.Control
                type="text"
                placeholder="Search URL"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {filteredHistory.map((item) => (
            <tr key={item.id}>
              <td>{item.url}</td>
              <td>{item.wordCount}</td>
              <td>

              {item.webLinks.length < 1 ? <p className="ms-3 mt-1">0</p> : (
                   <Button variant="link" onClick={() => handleRowClick(item.webLinks)}>
                    {item.webLinks.length}
                 </Button>
                )}
               
              </td>
              <td>
              {item.mediaLinks.length < 1 ? <p className="ms-3 mt-1">0</p> : (
                   <Button variant="link" onClick={() => handleRowClick(item.mediaLinks)}>
                    {item.mediaLinks.length}
                 </Button>
                )}
              </td>
              <td>{  
                  getFavIcon(item,item.favourite)
                 }
             </td>
              <td><button onClick={() => {handleDeleteHistoryById(item._id)}} type="button" class="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Pagination>{paginationItems}</Pagination>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Url</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedData.map(link => (
            <p className="overflow-hidden">{link}</p>
        ))}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
  );
};



export default History;
