import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = ({ user }) => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      {user.role === "admin" && (
        <Link to="/admin/dashboard">
          <p>
            <DashboardIcon /> Dashboard
          </p>
        </Link>
      )}
      {user.role === "seller" && (
        <Link to="/seller/dashboard">
          <p>
            <DashboardIcon /> Dashboard
          </p>
        </Link>
      )}
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            {user.role === "admin" && (
              <Link to="/admin/products">
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
              </Link>
            )}
            {user.role === "seller" && (
              <Link to="/seller/products">
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
              </Link>
            )}
            {user.role === "admin" && (
              <Link to="/admin/product">
                <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
              </Link>
            )}
            {user.role === "seller" && (
              <Link to="/seller/product">
                <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
              </Link>
            )}
          </TreeItem>
        </TreeView>
      </Link>
      {user.role === "admin" && (
        <Link to="/admin/orders">
          <p>
            <ListAltIcon />
            Orders
          </p>
        </Link>
      )}
      {user.role === "seller" && (
        <Link to="/seller/orders">
          <p>
            <ListAltIcon />
            Orders
          </p>
        </Link>
      )}
      {user.role === "admin" && (
        <Link to="/admin/users">
          <p>
            <PeopleIcon /> Users
          </p>
        </Link>
      )}
      {user.role === "admin" && (
        <Link to="/admin/reviews">
          <p>
            <RateReviewIcon />
            Reviews
          </p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
