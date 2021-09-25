import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL1 = "http://localhost:5001";
const API_URL = "https://zenbackend.herokuapp.com"

function AddQueries({history}) {
    const [id, setId] = useState();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        queryId: '',
        textChange: 'Add query'
      });
      const { title, description, queryId,  textChange } = formData;
      const handleChange = text => e => {
          console.log(text, e.target.value)
        setFormData({ ...formData, [text]: e.target.value });
        console.log(formData)
      };

      const handleSubmit = e => {
        e.preventDefault();
        console.log(title, description, id)
        if(title && description){
            setFormData({ ...formData, textChange: 'Submitting' });
            axios
          .post(`${API_URL}/api/user/add/query`, {
            title,
            description,
            id,
            queryId:'SR-'+Math.floor(1000 + Math.random() * 9000)
          })
          .then(res => {
            setFormData({
              ...formData,
              title: '',
              description: '',
              queryId: '',
              textChange: 'Submitted'
            })
            console.log("inside then")
            history.push('/users/queries')
            

        }).catch(err =>{
            console.log(err)
        });
      }
      else{
        toast.error("Enter title and description");
      }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let user = localStorage.getItem("user");
            console.log(user)
        if (user) {
          setId(user);
        }
        console.log(id)
        }                     
      }, []);


    return <div className="page-container">
        <Sidebar />
        <div className="main-content">
            <Topbar />        
            <div className="container1">
                <div className="addquery-container">
                <h4>Add Query</h4>
                    <div className = "query-form-container">
                    <form
                    className='w-full flex-1 mt-8 text-indigo-500'
                    onSubmit={handleSubmit}
                    >
                      <div className='mx-auto max-w-xs relative '>
                          <input
                          className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                          type='text'
                          placeholder='Title'
                          onChange={handleChange('title')}
                          value={title}
                          />
                          <input
                          className='w-full px-8 py-40 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                          type='text'
                          placeholder='Description'
                          onChange={handleChange('description')}
                          value={description}
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
export default AddQueries;