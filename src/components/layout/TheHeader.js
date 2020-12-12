import { Avatar } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import "./Header.css";
import { useStateValue } from "./../../StateProvider";

const TheHeader = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="header">
      <div className="header__search">
        <AccessTimeIcon className="header__search--icon" />

        <input type="text" placeholder="Search Fireship" />

        <HelpOutlineIcon className="header__search--icon notification" />
      </div>

      <div className="header__right">
        <Avatar
          className="header__avatar"
          alt={user?.displayName}
          // alt="Qazi"
          src={user?.photoURL}
          // src=""
        />
      </div>
    </div>
  );
};

export default TheHeader;
