import { useHistory } from "react-router-dom";
import db from "../../firebase";
import "./SidebarOption.css";

const SidebarOption = ({
  children,
  id,
  addChannelOption,
  title,
  onClick,
  setShowChannels,
}) => {
  const history = useHistory();

  const selectChannel = () => {
    if (id) {
      history.push(`/room/${id}`);
    } else {
      const toPush = title.toLowerCase();
      history.push(`/${toPush}`);
    }
  };

  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName?.trim()) {
      db.collection("rooms").add({ name: channelName });
      setShowChannels(true);
    }
  };

  return (
    <div
      className="sidebarOption"
      onClick={
        onClick ? onClick : addChannelOption ? addChannel : selectChannel
      }
    >
      {children && children}
      {children ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="sidebarOption__channel">
          <span className="sidebarOption__hash">#</span> {title}
        </h3>
      )}
    </div>
  );
};

export default SidebarOption;

// const arr = [
//   {id}
// ]
