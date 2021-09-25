import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { toast } from "react-toastify";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";

const API_URL1 = "http://localhost:5001";
const API_URL = "https://zenbackend.herokuapp.com"

function Tasks({history}) {
    const [tasks, setTasks] = useState([]);
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

    const submitTask = async(id)=>{
        
        history.push(`/submitTasks/${id}`)

    }



    const getUser = async (id) => {
    await axios
        .get(`${API_URL}/api/user/${id}`, {})
        .then((res) => {
        setTasks(res.data.tasks);
        console.log(res.data.tasks) 
        })
        .catch((err) => {
        toast.error("err");
        });
    };



    return <div className="page-container">
        <Sidebar />
        <div className="main-content">
            <Topbar />        
            <div className="container1">
                <div className="tasks-container">
                    <Table className="table tasks-table">
                        <thead>
                        <td>Task name</td>                        
                        <td>Submitted at</td>
                        <td>Github url</td>   
                        <td>Demo url</td>   
                        <td>Marks</td>   
                        <td>Action</td>                 
                        </thead>
                        <tbody>
                            {tasks.map((task,index)=>{
                                return(
                                    <tr key={index}>
                                    <td>{task.name}</td>
                                    <td>{task.submittedAt}</td>
                                    <td><a style={{color:"green"}} href={task.github} >{task.github}</a></td>
                                    <td><a style={{color:"green"}} href={task.deployment} >{task.deployment}</a></td>                                    
                                    <td>{task.grade}</td>
                                    
                                    <td><Button onClick={()=>submitTask(task.id)}>Submit</Button></td>

                                </tr>

                                )
                                
                            })}
                            
                        </tbody>
                    </Table>
                    </div>
                
                
                </div>
        </div>
       

    </div> 
}
export default Tasks;