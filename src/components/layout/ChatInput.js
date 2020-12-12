import { useState } from "react";
import db from "./../../firebase";
import { useStateValue } from "./../../StateProvider";
import firebase from "firebase";
import "./ChatInput.css";

const ChatInput = ({ channelName, channelId }) => {
  const [input, setInput] = useState("");

  const [{ user }, dispatch] = useStateValue();

  const sendMessage = (ev) => {
    ev.preventDefault();

    if (input.trim()) {
      db.collection("rooms").doc(channelId).collection("messages").add({
        message: input.trim(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });

      setInput("");
    }
  };

  return (
    <div className="chatInput">
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(ev) => setInput(ev.currentTarget.value)}
          type="text"
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        {/* <Button type="submit">Send</Button> */}
      </form>
    </div>
  );
};

export default ChatInput;
