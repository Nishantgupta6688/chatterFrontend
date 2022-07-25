import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ChatPage.module.css";
import sendButton from "../../images/icons/send-outline.svg";
import { initiateChat } from "./../../toolkit/startChat";
import { updateUser } from "../../toolkit/login";

function ChatPage() {
  const { clickedName } = useSelector((state) => state.startChat);
  const { clickedId } = useSelector((state) => state.startChat);
  const { chatData } = useSelector((state) => state.startChat);
  const { loggedInUser } = useSelector((state) => state.login);
  const { commonChatId } = useSelector((state) => state.startChat);
  const [message, setMessage] = useState('')
  const dispatch = useDispatch();

  const sendChatData = () => {
    dispatch(
      initiateChat({
        from: loggedInUser._id,
        to: clickedId,
        message: message,
        commonChatId,
      })
    ).then(setTimeout(() => dispatch(updateUser(loggedInUser._id)), 2000));
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatDetails}>
        <img alt="" />
        <h3>{clickedName[0].toUpperCase() + clickedName.slice(1)}</h3>
      </div>
      <div className={styles.chatwindow}>
        <div className={styles.chat}>
          {chatData.messages.length === 0 ? (
            <h3>Type in the input box and press send button</h3>
          ) : (
            <div>
              {chatData.messages.map((message, index) => {
                return (
                  <div key={index}
                    className={
                      loggedInUser._id === message.from._id
                        ? styles.chatMessageSender
                        : styles.chatMessageReceiver
                    }
                  >
                    <div>
                      <p>{message.from.firstName && message.from.firstName[0].toUpperCase() + message.from.firstName.slice(1) + " " + message.from.lastName + " " + message.date.slice(11,19)}</p>
                      <p key={index}>{message.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles.inputDiv}>
          <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here" />
          <img
            src={sendButton}
            alt="No Preview"
            onClick={() => { sendChatData(); setMessage(' '); }}
            
          ></img>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
