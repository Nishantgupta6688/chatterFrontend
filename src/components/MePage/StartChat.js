import React, { useState } from "react";
import NamesContainer from "./NamesContainer";

function StartChat() {
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <React.Fragment>
      <br />
      <input
        placeholder="Enter Email"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        onFocus={() => setActive(true)}
      />
      {active && (
        <NamesContainer setActive={setActive} searchTerm={searchTerm} />
      )}
    </React.Fragment>
  );
}

export default StartChat;
