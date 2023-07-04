import './App.css';
import io from 'socket.io-client';
import { useState } from "react";
import Chat from "./Chat.js";

const socket = io.connect("http://localhost:3001");

function App () {

  const [username, setUsername] = useState("");
  const [chanel, setChanel] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinChanel = () => {
    if (username !== "" && chanel !== "") {
      socket.emit("join_chanel", chanel);
      setShowChat(true);
    }
  }


  return (
  <div className="App">
    {!showChat ? (
  <div className='joinChatContainer'>
    <h3>Join A Chat</h3>
      <input type="text" 
       placeholder="Nickname" 
       onChange={(event) => {
      setUsername(event.target.value)}} 
      />

      <input 
      type="text" 
      placeholder="Chanel Id" 
      onChange = {(event) => {
      setChanel(event.target.value)}} />
      
    <button onClick={joinChanel}>Join A Channel</button>
    </div>
    ) : (
    <Chat socket={socket} username={username} chanel={chanel}/>
    )};
  </div>
)};

export default App;
