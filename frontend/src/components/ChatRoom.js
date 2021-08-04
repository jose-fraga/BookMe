import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useChat from "../useChat";
import SpinningBook from './RotateBook';

function ChatRoom(props) {
    const { roomId } = props.match.params; // Gets roomId from URL
    const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging

    const [newMessage, setNewMessage] = useState(""); // Message to be sent

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
      };



      const [book, setBook] = useState([]);

      useEffect( () => {

        (async function Request() {
          const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${roomId}`

            // `https://www.googleapis.com/books/v1/volumes?q="${roomId}+intitle:keyes"`

            // `https://www.googleapis.com/books/v1/volumes?q="${roomId}"`
            // `https://www.googleapis.com/books/v1/volumes?q=harry`
          );
          console.log("From the chatRoom:", res.data)
          setBook(res.data);
          
        })()

      }, [newMessage])






      return (
        <div className="chat-room-container">
        {/* <SpinningBook /> */}

        <SpinningBook book={book}/>

          <h1 className="room-name">Room: {book.volumeInfo?.title}</h1>
          <div className="messages-container">
            <ol className="messages-list">
              {messages.map((message, i) => (
                <li
                  key={i}
                  className={`message-item ${
                    message.ownedByCurrentUser ? "my-message" : "received-message"
                  }`}
                >
                  {message.body}
                </li>
              ))}
            </ol>
          </div>
          <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write message..."
            className="new-message-input-field"
          />
          <button onClick={handleSendMessage} className="send-message-button">
            Send
          </button>
        </div>
      );
}

export default ChatRoom;