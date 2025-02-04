import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Side_Navbar from "./Side_Navbar";

function App() {
  

  return (
    <div className="px-4 py-8">
      <h1 className="text-5xl">hello Rakshit</h1>
      
       <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit architecto veritatis reprehenderit excepturi, dolor assumenda laboriosam quas nihil eligendi numquam, exercitationem at quia doloremque quam voluptas in, libero dicta praesentium.</p>
      
    </div>
  );
}

export default App;
