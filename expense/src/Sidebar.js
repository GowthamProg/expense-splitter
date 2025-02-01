import React,{useState} from "react";
import "./Allstyles/Slidebar.css";
import {useNavigate} from "react-router-dom"
import Members from "./Members";
import { FiAlignJustify } from "react-icons/fi";
export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {setIsOpen(!isOpen)};
  return (
    <>
    <button className="toggle-button" onClick={toggleSidebar}>
      <FiAlignJustify />
    </button>
    <div className={`app-container ${isOpen ? "open" : ""} `}>
        <div className="sidebar">
          <button className="sidebarbutton" onClick={()=>navigate('/Members')}>Members</button>
          <button className="sidebarbutton">Option 2</button>
          <button className="sidebarbutton">Option 3</button>
          <button className="sidebarbutton">Option 4</button>
          <button className="sidebarbutton">Option 5</button>
        </div>
    </div>
    </>
  );
}