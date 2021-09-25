import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

const API_URL1 = "http://localhost:5001";
const API_URL = "https://zenbackend.herokuapp.com";

const Topbar = ({ history }) => {
  const [geek, setgeek] = useState();
  const [id, setId] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      let user = localStorage.getItem("user");
      if (user) {
        setId(user);
      }
      getUser(user);
    }
  }, []);

  const getUser = async (id) => {
    await axios
      .get(`${API_URL}/api/user/${id}`, {})
      .then((res) => {
        setgeek(res.data.geekcoins);
      })
      .catch((err) => {
        toast.error("err");
      });
  };
  return (
    <div className="topbar-container">
      <div className="topbar-element ">
        <strong>Geekcoins:</strong> {geek}
      </div>
      <div className="topbar-element ">
        <strong> Rank:</strong> 2000
      </div>
      <div className="topbar-element ">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <AccountCircleIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item href="/logout">Log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Topbar;
