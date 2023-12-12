import { useState } from "react";

import { Link } from "react-router-dom";
import { Typography, Menu, MenuItem, Box, styled } from "@mui/material";
import {
  AccountBalanceWallet,
  AccountBalanceWalletOutlined,
  AddCircleOutline,
  AddCircleRounded,
  ArrowDropDown,
  BoltOutlined,
  Favorite,
  FavoriteOutlined,
  LocalMallOutlined,
  NotificationAddOutlined,
  PaymentOutlined,
  PowerSettingsNew,
  Rule,
  RuleFolderOutlined,
} from "@mui/icons-material";

const Component = styled(Menu)`
  margin-top: 5px;
`;

const Logout = styled(Typography)`
  font-size: 14px;
  margin-left: 20px;
`;

const Profile = ({ account, setAccount }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    setAccount("");
  };

  return (
    <>
      <Box onClick={handleClick} style={{cursor:"pointer"}}>
        <Typography style={{ marginTop: 2 }}>
          <div style={{ display: "flex" }}>
            <span style={{ marginTop: "0.3rem" }}> {account.username}</span>{" "}
            <ArrowDropDown />
          </div>
        </Typography>
      </Box>
      <Component anchorEl={open} open={Boolean(open)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: "black",
                borderBottom: "1px solid #DCD6D0",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => logout()}
            >
              <PowerSettingsNew fontSize="small" color="primary" />
              <Logout>Logout</Logout>
            </div>
            <div
              style={{
                color: "black",
                borderBottom: "1px solid #DCD6D0",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <BoltOutlined fontSize="small" color="primary" />
              <Logout>
                <Link
                  to={"/flipgem"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  FlipGem Zone{" "}
                </Link>
              </Logout>
            </div>
            <div
              style={{
                color: "black",
                borderBottom: "1px solid #DCD6D0",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <AddCircleOutline fontSize="small" color="primary" />
              <Logout> Flipkart Plus Zone </Logout>
            </div>
            <div
              style={{
                color: "black",
                borderBottom: "1px solid #DCD6D0",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <AccountBalanceWalletOutlined fontSize="small" color="primary" />
              <Logout> Orders </Logout>
            </div>
            <div
              style={{
                color: "black",
                borderBottom: "1px solid #DCD6D0",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <FavoriteOutlined fontSize="small" color="primary" />
              <Logout> Wishlist</Logout>
            </div>
            <div
              style={{
                color: "black",
                borderBottom: "1px solid #DCD6D0",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <PaymentOutlined fontSize="small" color="primary" />
              <Link
                to="/coupons"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Logout>Coupons </Logout>
              </Link>
            </div>
            <div
              style={{
                color: "black",
                borderBottom: "1px solid #DCD6D0",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <LocalMallOutlined fontSize="small" color="primary" />
              <Logout>Gift Cards</Logout>
            </div>
            <div
              style={{
                color: "black",
                borderBottom: "1px solid #DCD6D0",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <RuleFolderOutlined fontSize="small" color="primary" />
              <Link
                to="/rulesandregulations"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Logout>
                  Loyalty Program <br /> Guidelines
                </Logout>
              </Link>
            </div>
          </div>
        </MenuItem>
      </Component>
    </>
  );
};

export default Profile;
