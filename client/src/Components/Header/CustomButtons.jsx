import React, { useState, useContext } from "react";

import { Box, Typography, Badge, Button, styled } from "@mui/material";
import { Info, ShoppingCart } from "@mui/icons-material";

import { Link } from "react-router-dom";
import { LoginContext } from "../../context/ContextProvider";
import { useSelector } from "react-redux";
import { NotificationAdd } from "@mui/icons-material";
import { Download } from "@mui/icons-material";
import { Token } from "@mui/icons-material";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HelpIcon from '@mui/icons-material/Help';

import Profile from "./Profile";
import LoginDialog from "../Login/LoginDialog";

const Container = styled(Link)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  margin: "0 3% 0 auto",
  display: "flex",
  "& > *": {
    marginRight: "40px !important",
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: 12,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      color: "#2874f0",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      marginTop: 10,
    },
  },
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: "#2874f0",
  background: "#FFFFFF",
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 2,
  padding: "5px 40px",
  height: 32,
  boxShadow: "none",
  [theme.breakpoints.down("sm")]: {
    background: "#2874f0",
    color: "#FFFFFF",
  },
}));

const CustomButtons = () => {
  const [moreDrop, setOpenDrop] = useState(false);
  const [open, setOpen] = useState(false);
  const { account, setAccount } = useContext(LoginContext);

  const cartDetails = useSelector((state) => state.cart);
  const { cartItems } = cartDetails;

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <Wrapper>
      {account ? (
        <Profile account={account} setAccount={setAccount} />
      ) : (
        <LoginButton variant="contained" onClick={() => openDialog()} style={{marginLeft:'1rem'}}>
          Login
        </LoginButton>
      )}
      <Typography style={open?{ marginTop: 3, width:135,cursor:"pointer" }:{ marginTop: 3, width:150,cursor:"pointer" }} >
        Become a Seller
      </Typography>
      <Typography style={{ marginTop: 3 ,cursor:"pointer"}}>
        <a onClick={() => setOpenDrop(!moreDrop)}>More</a>
      </Typography>
      {moreDrop && (
        <div
          style={{
            width: "13rem",
            height: "11.2rem",
            position: "absolute",
            marginLeft: "15rem",
            marginTop: "2rem",
            backgroundColor: "#fff",
            boxShadow: "10px 10px 35px -7px rgba(0, 0, 0, 0.75)",
            WebkitBoxShadow: "10px 10px 35px -7px rgba(0, 0, 0, 0.75)",
            MozBoxShadow: "10px 10px 35px -7px rgba(0, 0, 0, 0.75)",
          }}
        >
          <div
            style={{
              color: "black",
              borderBottom: "1px solid #DCD6D0",
              padding: "0.5rem",
              display:'flex',
              alignItems:'center',
              cursor:'pointer'
            }}
          >
            <div style={{paddingRight:'0.5rem', paddingTop:'0.2rem'}} >
              <NotificationAdd style={{ color: "#2874f0", fontSize: "20px" }} />
            </div>{" "}
            <div> Notification Preferences</div>
          </div>
          <div
            style={{
              color: "black",
              borderBottom: "1px solid #DCD6D0",
              padding: "0.5rem",
              display:'flex',
              alignItems:'center',
              cursor:'pointer'
            }}
          >
            <div style={{paddingRight:'0.5rem', paddingTop:'0.2rem'}} >
              <HelpIcon style={{ color: "#2874f0", fontSize: "20px" }} />
            </div>{" "}
            <div> 24 X 7 Customer Service</div>
          </div>
          <div
            style={{
              color: "black",
              borderBottom: "1px solid #DCD6D0",
              padding: "0.5rem",
              display:'flex',
              alignItems:'center',
              cursor:'pointer'
            }}
          >
            <div style={{paddingRight:'0.5rem', paddingTop:'0.2rem'}} >
              <ShowChartIcon style={{ color: "#2874f0", fontSize: "20px" }} />
            </div>{" "}
            <div> Advertise</div>
          </div>
          <div
            style={{
              color: "black",
              borderBottom: "1px solid #DCD6D0",
              padding: "0.5rem",
              display:'flex',
              alignItems:'center',
              cursor:'pointer'
            }}
          >
            <div style={{paddingRight:'0.5rem', paddingTop:'0.2rem'}} >
              <Download style={{ color: "#2874f0", fontSize: "20px" }} />
            </div>{" "}
            <div> Download App</div>
          </div>
          <div
            style={{
              color: "black",
              backgroundColor: "white",
              borderBottom: "1px solid #DCD6D0",
              padding: "0.5rem",
              display:'flex',
              alignItems:'center',
              cursor:'pointer'
            }}
          >
            <div style={{paddingRight:'0.5rem', paddingTop:'0.2rem'}} >
              <Token style={{ color: "#2874f0", fontSize: "20px" }} />
            </div>{" "}
            <Link to='./issuetoken' style={{textDecoration:'none'}}><div > Issue Token</div></Link>
          </div>
          <div
            style={{
              color: "black",
              backgroundColor: "white",
              borderBottom: "1px solid #DCD6D0",
              padding: "0.5rem",
              display:'flex',
              alignItems:'center',
              cursor:'pointer'
            }}
          >
            <div style={{paddingRight:'0.5rem', paddingTop:'0.2rem'}} >
              <Info style={{ color: "#2874f0", fontSize: "20px" }} />
            </div>{" "}
            <Link to='./about' style={{textDecoration:'none'}}><div > About Us</div></Link>
          </div>
        </div>
      )}
      <Container to="/cart">
        <Badge badgeContent={cartItems?.length} color="secondary">
          <ShoppingCart />
        </Badge>
        <Typography style={{ marginLeft: 10 }}>Cart</Typography>
      </Container>
      <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
    </Wrapper>
  );
};

export default CustomButtons;
