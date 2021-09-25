import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL1 = "http://localhost:5001";
const API_URL = "https://zenbackend.herokuapp.com"

function SubmitTask({history, match}) {
    const [taskId, setTaskId] = useState([]);
    const [id, setId] = useState();
    const [formData, setFormData] = useState({
        github: '',
        deployment: '',
        comments: '',
        textChange: 'Submit '
      });
      const { github, deployment, comments,  textChange } = formData;
      const handleChange = text => e => {
          console.log(text, e.target.value)
        setFormData({ ...formData, [text]: e.target.value });
        console.log(formData)
      };

      const handleSubmit = e => {
        e.preventDefault();
        console.log(github, deployment, comments)
        if(github && deployment){
            setFormData({ ...formData, textChange: 'Submitting' });
            axios
          .put(`${API_URL}/api/user/task/submit`, {
            github,
            deployment,
            comments,
            id,
            taskId
          })
          .then(res => {
            setFormData({
              ...formData,
              github: '',
              deployment: '',
              comments: '',
              textChange: 'Submitted'
            })
            history.push('/users/tasks')
            

        }).catch(err =>{
            console.log(err)
        });
      }else{
        toast.error("Enter github and demo url");
      }
    }

    useEffect(() => {
        let taskId = match.params.id;
        if (typeof window !== 'undefined') {
            let user = localStorage.getItem("user");
            console.log(user)
        if (user) {
          setId(user);
          setTaskId(taskId);
        }
        console.log(id)
        // getUser(user);        
        }                     
      }, []);


    return <div className="page-container">
        <Sidebar />
        <div className="main-content">
            <Topbar />        
            <div className="container1">
                <div className="submitTask-container">
                <h4>Submit Task</h4>
                    {/* <div className = "query-topbar-container">
                        
                        <Button onClick={addQuery} style={{backgroundColor:"green"}}>Add Query</Button>

                    </div> */}
                    <div className = "task-submit-container">
                    <form
                    className='w-full flex-1 mt-8 text-indigo-500'
                    onSubmit={handleSubmit}
                    >
                    <div className='mx-auto max-w-xs relative '>
                        <input
                        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                        type='text'
                        placeholder='Github url'
                        onChange={handleChange('github')}
                        value={github}
                        />
                        <input
                        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                        type='text'
                        placeholder='Demo url'
                        onChange={handleChange('deployment')}
                        value={deployment}
                        />
                        <input
                        className='w-full px-8 py-40 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                        type='text'
                        placeholder='Comments'
                        onChange={handleChange('comments')}
                        value={comments}
                        row= '20'
                        />
                        
                        <button
                        type='submit'
                        className='mt-5 tracking-wide font-semibold bg-green-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                        >
                        <span className='ml-3'>{textChange}</span>
                        </button>
                    </div>
                   
            </form>
        
                    </div>
                    
                    </div>
                
                
                </div>
        </div>
       

    </div> 
}
export default SubmitTask;