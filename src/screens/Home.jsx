import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { toast } from "react-toastify";
import axios from "axios";


const API_URL1 = "http://localhost:5001";
const API_URL = "https://zenbackend.herokuapp.com"

function Home({history}) {
    const [tasks, setTasks] = useState([]);
    const [completed, setCompleted]  = useState();
  const [id, setId] = useState();
  useEffect(() => {
    if (typeof window !== 'undefined') {
        let user = localStorage.getItem("user");
    if (user) {
      setId(user);
    }
    else{
      alert("Login or sign up to proceed")
      history.push('/login')

    }
    getUser(user);
    
    }            
    
     
  }, []);
  const getUser = async (id) => {
    await axios
      .get(`${API_URL}/api/user/${id}`, {})
      .then((res) => {
        setTasks(res.data.tasks);
        let t = {...tasks}
        let count = 0;
        for(let i in t){
            if(t[i].github && t[i].deployment){
                count++
            }
        }
        setCompleted(count);

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
                <div className="attendance-container">
                    <h1 style={{color:"white", fontSize:'35px'}}>Attendance</h1>
                    <table className="table attendance-table">
                        <thead>
                        <td>Days present</td>
                        <td>Days absent</td>
                        <td>Attendance %</td>
                        <td>Total working days</td>                    
                        </thead>
                        <tbody>
                            <td>15</td>
                            <td>16</td>
                            <td>48.4</td>
                            <td>31</td>
                        </tbody>
                    </table>
                    </div>
                <div className="task-container"><h1 style={{color:"white", fontSize:'35px'}}>Tasks</h1>
                    <table className="table task-table">
                        <thead>
                        <td>Submitted</td>
                        <td>Pending</td>
                        <td>Submission %</td>
                        <td>Total tasks</td>                    
                        </thead>
                        <tbody>
                            <td>{completed}</td>
                            <td>{tasks.length-completed}</td>
                            <td>0</td>
                            <td>{tasks.length}</td>
                        </tbody>
                    </table>
                </div>
                
                </div>
        </div>
        </div>
}
export default Home;