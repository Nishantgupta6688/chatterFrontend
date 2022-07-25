import React, { useEffect, useState } from "react";
import styles from "./NamesContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearChat, searchChat, startChat, updateCommonChatId } from "../../toolkit/startChat";

function NamesContainer(props) {
  const [names, setNames] = useState([]);
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.login);

  const searchCommonChat = (chatIds) => {
    var found = false;
    loggedInUser.AllchatID.map((chatId) => chatIds.map((chat) => { if(chat === chatId._id) {
          found = true;
          dispatch(updateCommonChatId(chatId._id));
          dispatch(searchChat({chatId : chatId._id}))
        }
  })
    );
    if (!found) {
      dispatch(updateCommonChatId(null));
      dispatch(clearChat())
    }
  };
  

  useEffect(() => {
    fetch("http://localhost:5000/api/readUsers")
      .then((response) => response.json())
      .then((response) => setNames(response.payload));
  }, [names]);

  return (
    <div className={styles.container}>
      <button onClick={() => props.setActive(false)}>Close</button>
      {names
        .filter((user) =>
          user.email.toLowerCase().includes(props.searchTerm.toLowerCase())
        )
        .filter((user) => 
          user.email !== loggedInUser.email
        )
        .map((user, index) => (
          <button
            key={index}
            className={styles.button}
            onClick={ () => {
              searchCommonChat(user.AllchatID);
              dispatch(
                startChat({
                  userName: user.firstName + " " + user.lastName,
                  userId: user._id
                })
              )
              props.setActive(false);
            }}
          >
            {user.firstName + " " + user.lastName}
          </button>
        ))}
    </div>
  );
}

export default NamesContainer;
