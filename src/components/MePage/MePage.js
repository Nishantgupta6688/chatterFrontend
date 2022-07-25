import React from "react";
import { useSelector } from "react-redux";
import styles from "./MePage.module.css";
import StartChat from "./StartChat";
import ChatPage from "./ChatPage";
import SelectChat from "./SelectChat";

function MePage() {
  const { loggedInUser } = useSelector((state) => state.login);
  const { clickedName } = useSelector((state) => state.startChat);
  const chats = loggedInUser.AllchatID.length || 0;

  return (
    <div className={styles.container}>
      <div className={styles.chatNames}>
        <StartChat />
        <br />
        {chats ? <SelectChat /> : <p>You haven't started a conversation yet</p>}
      </div>
      <div className={styles.chats}>{clickedName && <ChatPage />}</div>
    </div>
  );
}

export default MePage;
