import "./Message.css";

const Message = ({ message, timestamp, user, userImage, sameUser }) => {
  return (
    <div className={`message ${sameUser ? "message__same" : ""}`}>
      {!sameUser && <img src={userImage} alt={user} />}
      <div className="message__info">
        {!sameUser && (
          <h4>
            {user} <span>{timestamp?.toDate().toUTCString()}</span>
          </h4>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
