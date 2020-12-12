import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import db from "./../../firebase";
import Message from "./Message";
import "./Chat.css";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snap) => {
          setRoomDetails(snap.data());

          document.title = `Slack | ${
            snap.data().name.charAt(0).toUpperCase() + snap.data().name.slice(1)
          } | Firebase`;
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) =>
          setRoomMessages(snap.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <div className="chat__channelName">
            <strong>
              #{roomDetails ? roomDetails.name : "fetching channel name"}
            </strong>
            <StarBorderOutlined />
          </div>
        </div>
        <div className="chat__headerRight">
          <InfoOutlined />
        </div>
      </div>

      {roomMessages.length ? (
        <div className="chat__messages">
          {roomMessages.map(({ message, timestamp, user, userImage }, idx) => (
            <Message
              key={timestamp}
              message={message}
              timestamp={timestamp}
              user={user}
              userImage={userImage}
              sameUser={
                roomMessages[idx - 1]
                  ? roomMessages[idx - 1].userImage === userImage
                  : false
              }
            />
          ))}
        </div>
      ) : (
        <></>
      )}

      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  );
};

export default Chat;
