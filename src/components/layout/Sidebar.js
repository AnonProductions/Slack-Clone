import { useState, useEffect } from "react";
import {
  ChevronLeft,
  InboxOutlined,
  InsertCommentOutlined,
  BookmarkBorderOutlined,
  PeopleAltOutlined,
  AppsOutlined,
  FileCopyOutlined,
  ExpandLessOutlined,
  Add,
  ChevronRight,
} from "@material-ui/icons";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SidebarOption";
import "./Sidebar.css";
import db from "../../firebase";

const Sidebar = () => {
  const [channels, setChannels] = useState([]);
  const [showChannels, setShowChannels] = useState(false);
  const [showLess, setShowLess] = useState(true);

  useEffect(() => {
    db.collection("rooms").onSnapshot((snap) =>
      setChannels(
        snap.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h2>
          Fireship
          <span>
            <ChevronLeft className="sidebar__chevron" />
          </span>
        </h2>
        <CreateIcon className="sidebar__create" />
      </div>
      <SidebarOption title="Threads">
        <InsertCommentOutlined className="sidebarOption__icon" />
      </SidebarOption>

      <SidebarOption title="Mentions & reactions">
        <InboxOutlined className="sidebarOption__icon" />
      </SidebarOption>

      {!showLess && (
        <>
          <SidebarOption title="Channel browser">
            <BookmarkBorderOutlined className="sidebarOption__icon" />
          </SidebarOption>

          <SidebarOption title="People & user groups">
            <PeopleAltOutlined className="sidebarOption__icon" />
          </SidebarOption>

          <SidebarOption title="Apps">
            <AppsOutlined className="sidebarOption__icon" />
          </SidebarOption>

          <SidebarOption title="File browser">
            <FileCopyOutlined className="sidebarOption__icon" />
          </SidebarOption>
        </>
      )}

      <SidebarOption
        title={`Show ${showLess ? "more" : "less"}`}
        onClick={() => setShowLess(!showLess)}
      >
        <ExpandLessOutlined
          style={showLess ? { transform: "rotate(180deg)" } : {}}
          className="sidebarOption__icon"
        />
      </SidebarOption>

      <hr />

      <SidebarOption
        title="Channels"
        onClick={() => setShowChannels(!showChannels)}
      >
        <ChevronRight
          style={showChannels ? { transform: "rotate(-90deg" } : {}}
          className="sidebarOption__icon"
        />
      </SidebarOption>

      {showChannels &&
        channels.map((channel) => (
          <SidebarOption
            title={channel.name}
            id={channel.id}
            key={channel.id}
          />
        ))}

      <hr />

      <SidebarOption
        title="Add Channel"
        addChannelOption
        setShowChannels={setShowChannels}
      >
        <Add className="sidebarOption__icon" />
      </SidebarOption>
    </div>
  );
};

export default Sidebar;
