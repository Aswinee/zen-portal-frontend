import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import TaskIcon from "@mui/icons-material/Task";
import Logo1 from "../assets/guvi.PNG";
const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-element logo">
        <img src={Logo1} height="20px" className="object-scale-down"></img>
      </div>
      <div className="sidebar-element dashboard">
        <DashboardIcon className="icon" />
        <NavLink
          exact
          to="/home"
          activeClassName="activeClicked"
          className="sidebar-link"
        >
          Dashboard
        </NavLink>
      </div>
      <div className="sidebar-element">
        <TaskIcon className="icon" />
        <NavLink
          exact
          to="/users/tasks"
          activeClassName="activeClicked"
          className="sidebar-link"
        >
          Tasks
        </NavLink>
      </div>
      <div className="sidebar-element">
        <ConfirmationNumberIcon className="icon" />
        <NavLink
          exact
          to="/users/queries"
          activeClassName="activeClicked"
          className="sidebar-link"
        >
          Queries
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
