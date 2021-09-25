import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { toast } from "react-toastify";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";

const API_URL1 = "http://localhost:5001";
const API_URL = "https://zenbackend.herokuapp.com"

function Queries({history}) {
    const [queries, setQueries] = useState([]);
    const [id, setId] = useState();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let user = localStorage.getItem("user");
            console.log(user)
        if (user) {
          setId(user);
        }
        console.log(id)
        getUser(user);        
        }                     
      }, []);



    const getUser = async (id) => {
    await axios
        .get(`${API_URL}/api/user/${id}`, {})
        .then((res) => {
        setQueries(res.data.queries);
        console.log(res.data.queries) 
        })
        .catch((err) => {
        toast.error("err");
        });
    };

    const addQuery = ()=>{
        if (typeof window !== 'undefined') {
            let user = localStorage.getItem("user");
            console.log(user)
        if (user) {
          history.push('/users/addQueries')
        }

    }
}



    return <div className="page-container">
        <Sidebar />
        <div className="main-content">
            <Topbar />        
            <div className="container1">
                <div className="query-container">
                <h4>Queries</h4>
                    <div className = "query-topbar-container">
                        
                        <Button onClick={addQuery} style={{backgroundColor:"green"}}>Add Query</Button>

                    </div>
                    <div className = "query-table-container">
                    <Table className="table query-table">
                        <thead>
                        <td>Request-No</td>
                        <td>Title</td>
                        <td>Created-at</td>
                        <td>Status</td>   
                        <td>Assigned-to</td>              
                        </thead>
                        <tbody>
                            {queries.map((query,index)=>{
                                return(
                                    <tr key={index}>
                                                                         
                                    <td>{query.id}</td>
                                    <td>{query.title}</td>
                                    <td>{query.createdAt}</td>
                                    <td>{query.status}</td>
                                    <td>{query.mentor}</td>   

                                </tr>

                                )
                                
                            })}
                            
                        </tbody>
                    </Table>

                    </div>
                    
                    </div>
                
                
                </div>
        </div>
       

    </div> 
}
export default Queries;