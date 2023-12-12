import React from "react";
import "./style.css";
import Swal from "sweetalert2";
import { LoginContext } from "../../context/ContextProvider";
import Chart from "chart.js/auto";
import axios from "axios";

import { useState } from "react";
import {
  CopyAll,
  CopyAllOutlined,
  ShoppingBagOutlined,
  ShoppingBagRounded,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import chart from ''

// import pref from './DashboardHtml/index.html';
const Dashboard = () => {
  const [isloading, setisLoading] = useState(true);
  const { account, setAccount } = React.useContext(LoginContext);
  const [timestamparr, settimestamparr] = useState([]);
  const [flipgem, setFlipgem] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [graphdata, setGraphdata] = useState([0,100,90]);

  const getFlipgem = async () => {
    // console.log(account._id)
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/getflipgem`,
      {
        userId: account._id,
      }
    );
    console.log(res.data);
    setFlipgem(res.data.balance);
  };
  const getTransactions = async () => {
    // console.log(account._id)
    setisLoading(true);
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/getusertransactions`,
      {
        userId: account._id,
      }
    );
    console.log(res.data);
    setTransactions(res.data.transactions.reverse());
    const balanceChanges = [];

    const arr = res.data.transactions.reverse();
    let timeStamps = [];
    for (const transaction of res.data.transactions) {
      // Assuming positive value for income, negative for expenses
      //  console.log(transaction.to ,account.walletAddress);
      let currentBalance = 0;
      {
        transaction.to === account.walletAddress
          ? (currentBalance += parseInt(transaction.amount))
          : (currentBalance -= parseInt(transaction.amount));
      }
      timeStamps.push(transaction.timestamp.substring(0, 10));
      balanceChanges.push(currentBalance);
    }
    let prefix = [0];
    for (let i = 0; i < balanceChanges.length; i++) {
      prefix.push(prefix[i] + balanceChanges[i]);
    }
    console.log(timeStamps);
    console.log(timeStamps);

    // setGraphdata([...prefix]);
    settimestamparr([...timeStamps]);
    setisLoading(false);
  };
  const handleCopy = () => {
    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = account.walletAddress;
    document.body.appendChild(tempInput);

    // Select the input's content and copy it to the clipboard
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Show a success Swal alert
    Swal.fire(
      "Copied!",
      "Wallet address has been copied to the clipboard",
      "success"
    );
  };
  React.useEffect(() => {
    getFlipgem();
    getTransactions();
    const ctx = document.getElementById("myChart").getContext("2d");
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, "rgba(64, 186, 255, 0.17)");
    gradientFill.addColorStop(1, "rgba(64, 186, 255, 0)");
    const existingChart = Chart.instances[0];
    if (existingChart) {
      existingChart.destroy();
    }
    console.log(transactions.size);
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "2023-8-20",
          "2023-8-20",
          "2023-8-20",
        ],
        datasets: [
          {
            label: "FlipGems",
            borderColor: "#4062FF",
            pointBorderColor: "#FFFFFF",
            pointBackgroundColor: "#40BAFF",
            pointBorderWidth: 3,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 3,
            // pointRadius: 0,
            // tension: 0.4,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 3,
            data: graphdata.slice(0, 3),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                family: "'Nexa', 'sans-serif'",
                size: 14,
                weight: "bold",
                color: "#919EAB",
              },
            },
          },
          y: {
            grid: {
              display: false,
            },
            min: 0,
            max: 200,
            ticks: {
              stepSize: 10,
              font: {
                family: "'Nexa', 'sans-serif'",
                size: 14,
                weight: "bold",
                color: "#919EAB",
              },
            },
          },
        },
      },
    });
    // Chart.register(CategoryScale);
    const navHamburger = document.querySelector(".nav__hamburger");
    const navMenuContainer = document.querySelector(".nav");
    const navLogo = document.querySelector(".nav__logo");

    const handleNavHamburgerClick = () => {
      if (navHamburger.classList.contains("active")) {
        navHamburger.classList.remove("active");
        navMenuContainer.classList.remove("active");
        navMenuContainer.style.animation = "fadeOut .5s forwards";
        window.setTimeout(() => {
          navMenuContainer.classList.remove("nav__menu-hamburger");
        }, 500);
        window.setTimeout(() => {
          navLogo.classList.remove("active");
        }, 500);
      } else {
        navHamburger.classList.add("active");
        navMenuContainer.classList.add("active");
        navLogo.classList.add("active");
        navMenuContainer.style.animation = "fadeIn .5s forwards";
      }
    };

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        navMenuContainer.style = "";
        navHamburger.classList.remove("active");
        navMenuContainer.classList.remove("active");
      }
    };

    // navHamburger.addEventListener("click", handleNavHamburgerClick);
    // window.addEventListener("resize", handleResize);

    return () => {
      // navHamburger.removeEventListener("click", handleNavHamburgerClick);
      // window.removeEventListener("resize", handleResize);
      myChart.destroy();
    };
  }, []);
  // console.log(flipgem);
  return (
    // <iframe src={pref}></iframe>
    <div class="flex">
      {/* <nav class="nav flex flex-column">
        <ul class="nav__menus flex flex-column mb-14">
          <svg
            width="136"
            height="46"
            viewBox="0 0 136 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="nav__logo mb-11"
          >
            <path
              d="M30.7894 8.25002C28.2811 6.80184 25.4358 6.03943 22.5394 6.03944C19.6431 6.03944 16.7977 6.80184 14.2894 8.25002C11.7811 9.6982 9.69818 11.7811 8.25 14.2894C6.80182 16.7978 6.03942 19.6431 6.03942 22.5394C6.03942 25.4358 6.80182 28.2811 8.25 30.7894C9.69818 33.2978 11.7811 35.3807 14.2894 36.8289C16.7977 38.277 19.6431 39.0394 22.5394 39.0394C25.4358 39.0394 28.2811 38.277 30.7894 36.8289L28.1285 32.2201C26.4292 33.2012 24.5016 33.7177 22.5394 33.7177C20.5772 33.7177 18.6496 33.2012 16.9503 32.2201C15.251 31.239 13.8399 29.8279 12.8588 28.1285C11.8777 26.4292 11.3612 24.5016 11.3612 22.5394C11.3612 20.5773 11.8777 18.6496 12.8588 16.9503C13.8399 15.251 15.251 13.8399 16.9503 12.8588C18.6496 11.8777 20.5772 11.3612 22.5394 11.3612C24.5016 11.3612 26.4292 11.8777 28.1285 12.8588L30.7894 8.25002Z"
              fill="#4062FF"
            />
            <path
              d="M16.456 28.744C14.776 27.064 13.936 25.016 13.936 22.6C13.936 20.184 14.776 18.136 16.456 16.456C18.152 14.776 20.384 13.936 23.152 13.936C24.384 13.936 25.456 14.112 26.368 14.464C27.296 14.816 28.232 15.344 29.176 16.048L27.64 18.88C26.216 17.792 24.728 17.248 23.176 17.248C21.512 17.248 20.184 17.76 19.192 18.784C18.2 19.792 17.704 21.064 17.704 22.6C17.704 24.136 18.2 25.416 19.192 26.44C20.184 27.448 21.512 27.952 23.176 27.952C24.728 27.952 26.216 27.408 27.64 26.32L29.176 29.152C28.232 29.856 27.296 30.384 26.368 30.736C25.456 31.088 24.384 31.264 23.152 31.264C20.384 31.264 18.152 30.424 16.456 28.744ZM34.6801 18.688V21.376C34.8561 20.384 35.2961 19.648 36.0001 19.168C36.7041 18.672 37.3921 18.424 38.0641 18.424C38.3361 18.424 38.6401 18.456 38.9761 18.52V22.048C38.5121 21.936 38.0081 21.88 37.4641 21.88C36.7281 21.88 36.0961 22.096 35.5681 22.528C35.0401 22.944 34.7761 23.536 34.7761 24.304V31H31.2001V18.688H34.6801ZM46.5209 26.392L49.4489 18.688H53.3849L45.4169 36.616H41.8169L44.6249 29.968L39.5609 18.688H43.5929L46.5209 26.392ZM64.9703 24.88C64.9703 23.856 64.6823 23.008 64.1063 22.336C63.5463 21.664 62.7783 21.328 61.8023 21.328C60.8743 21.328 60.1063 21.624 59.4983 22.216C58.8903 22.808 58.5863 23.632 58.5863 24.688C58.5863 25.824 58.8903 26.72 59.4983 27.376C60.1063 28.032 60.9063 28.36 61.8983 28.36C62.8423 28.36 63.5863 28.032 64.1303 27.376C64.6903 26.704 64.9703 25.872 64.9703 24.88ZM58.6823 36.616H55.1063V18.688H58.6823V20.488C59.6423 19.112 60.9303 18.424 62.5463 18.424C64.3703 18.424 65.8263 19.04 66.9143 20.272C68.0023 21.504 68.5463 23.048 68.5463 24.904C68.5463 26.712 68.0183 28.224 66.9623 29.44C65.9223 30.656 64.4743 31.264 62.6183 31.264C61.8183 31.264 61.0663 31.088 60.3623 30.736C59.6743 30.384 59.1143 29.912 58.6823 29.32V36.616ZM75.1317 15.664V18.688H78.5397V21.496H75.1317V27.256C75.1317 27.976 75.4357 28.336 76.0437 28.336C76.6677 28.336 76.9797 27.952 76.9797 27.184C76.9797 26.784 76.9237 26.432 76.8117 26.128H79.6437C79.8357 26.528 79.9317 27.016 79.9317 27.592C79.9317 28.6 79.5877 29.464 78.8997 30.184C78.2117 30.904 77.1877 31.264 75.8277 31.264C72.9797 31.264 71.5557 29.816 71.5557 26.92V21.496H69.7077V18.688H71.8197L72.3717 15.664H75.1317ZM82.9319 29.464C81.6039 28.248 80.9399 26.704 80.9399 24.832C80.9399 22.96 81.6039 21.424 82.9319 20.224C84.2759 19.024 85.8679 18.424 87.7079 18.424C89.5479 18.424 91.1319 19.032 92.4599 20.248C93.8039 21.448 94.4759 22.976 94.4759 24.832C94.4759 26.704 93.8039 28.248 92.4599 29.464C91.1319 30.664 89.5479 31.264 87.7079 31.264C85.8679 31.264 84.2759 30.664 82.9319 29.464ZM84.4199 24.832C84.4199 25.792 84.7399 26.592 85.3799 27.232C86.0359 27.872 86.8119 28.192 87.7079 28.192C88.6199 28.192 89.3959 27.872 90.0359 27.232C90.6759 26.576 90.9959 25.776 90.9959 24.832C90.9959 23.888 90.6759 23.096 90.0359 22.456C89.3959 21.816 88.6199 21.496 87.7079 21.496C86.8119 21.496 86.0359 21.816 85.3799 22.456C84.7399 23.096 84.4199 23.888 84.4199 24.832Z"
              fill="black"
            />
            <path
              d="M109.45 18.784C109.45 19.536 109.21 20.232 108.73 20.872C108.266 21.496 107.594 21.968 106.714 22.288C107.706 22.48 108.538 22.976 109.21 23.776C109.882 24.56 110.218 25.392 110.218 26.272C110.218 27.696 109.666 28.84 108.562 29.704C107.474 30.568 106.042 31 104.266 31H97.2342V14.176L103.546 14.2C105.274 14.2 106.69 14.616 107.794 15.448C108.898 16.264 109.45 17.376 109.45 18.784ZM102.898 23.848H100.954V28.048H104.266C104.906 28.048 105.426 27.88 105.826 27.544C106.242 27.208 106.45 26.76 106.45 26.2C106.45 25.496 106.202 24.928 105.706 24.496C105.226 24.064 104.29 23.848 102.898 23.848ZM100.954 21.256H102.49C104.618 21.256 105.682 20.488 105.682 18.952C105.682 18.376 105.474 17.936 105.058 17.632C104.658 17.312 104.154 17.152 103.546 17.152H100.954V21.256ZM116.149 18.688V21.376C116.325 20.384 116.765 19.648 117.469 19.168C118.173 18.672 118.861 18.424 119.533 18.424C119.805 18.424 120.109 18.456 120.445 18.52V22.048C119.981 21.936 119.477 21.88 118.933 21.88C118.197 21.88 117.565 22.096 117.037 22.528C116.509 22.944 116.245 23.536 116.245 24.304V31H112.669V18.688H116.149ZM123.385 29.464C122.057 28.248 121.393 26.704 121.393 24.832C121.393 22.96 122.057 21.424 123.385 20.224C124.729 19.024 126.321 18.424 128.161 18.424C130.001 18.424 131.585 19.032 132.913 20.248C134.257 21.448 134.929 22.976 134.929 24.832C134.929 26.704 134.257 28.248 132.913 29.464C131.585 30.664 130.001 31.264 128.161 31.264C126.321 31.264 124.729 30.664 123.385 29.464ZM124.873 24.832C124.873 25.792 125.193 26.592 125.833 27.232C126.489 27.872 127.265 28.192 128.161 28.192C129.073 28.192 129.849 27.872 130.489 27.232C131.129 26.576 131.449 25.776 131.449 24.832C131.449 23.888 131.129 23.096 130.489 22.456C129.849 21.816 129.073 21.496 128.161 21.496C127.265 21.496 126.489 21.816 125.833 22.456C125.193 23.096 124.873 23.888 124.873 24.832Z"
              fill="#4062FF"
            />
          </svg>
          <li class="mt-8 mb-3">
            <a class="nav__menu active flex flex-align-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.13478 20.7733V17.7156C9.13478 16.9351 9.77217 16.3023 10.5584 16.3023H13.4326C13.8102 16.3023 14.1723 16.4512 14.4393 16.7163C14.7063 16.9813 14.8563 17.3408 14.8563 17.7156V20.7733C14.8539 21.0978 14.9821 21.4099 15.2124 21.6402C15.4427 21.8705 15.7561 22 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0008C21.1356 20.3588 21.5 19.487 21.5 18.5778V9.86686C21.5 9.13246 21.1721 8.43584 20.6046 7.96467L13.934 2.67587C12.7737 1.74856 11.1111 1.7785 9.98539 2.74698L3.46701 7.96467C2.87274 8.42195 2.51755 9.12064 2.5 9.86686V18.5689C2.5 20.4639 4.04738 22 5.95617 22H7.87229C8.55123 22 9.103 21.4562 9.10792 20.7822L9.13478 20.7733Z"
                  fill="black"
                />
              </svg>
              Dashboard
            </a>
          </li>
          <li class="mb-3">
            <a class="nav__menu flex flex-align-center ">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3 12.8294C18.5124 12.8294 19.6102 12.8983 20.2855 13.0265C20.296 13.0265 20.9139 13.1536 21.1199 13.2356C21.4172 13.3639 21.6688 13.5955 21.8291 13.8853C21.9438 14.1169 22 14.3616 22 14.617C21.9895 14.883 21.8174 15.3831 21.7367 15.5802C21.2346 16.8797 19.5868 19.3633 18.5815 20.3158C18.4211 20.4774 18.2269 20.652 18.1812 20.6983C17.9284 20.8955 17.6206 21 17.2894 21C16.991 21 16.6937 20.9074 16.4538 20.7209C16.3292 20.6318 16.1473 20.4545 16.0641 20.3715L16.0196 20.3265C14.978 19.3526 13.4121 16.926 12.9089 15.6955C12.8982 15.6955 12.6475 15.0816 12.5968 14.7113L12.5882 14.617V14.5706C12.5882 14.0361 12.8855 13.5373 13.3665 13.2819C13.6298 13.1429 14.3952 13.0147 14.4069 13.0028C15.0927 12.8983 16.1449 12.8294 17.3 12.8294ZM6.70553 12.8905C7.18478 12.8905 7.57926 13.2561 7.63317 13.7277L7.63945 13.8383L7.89575 18.4171C7.89575 19.0846 7.36325 19.625 6.70553 19.625C6.08892 19.625 5.58133 19.15 5.52029 18.5406L5.51414 18.4171L5.77161 13.8383C5.77161 13.3146 6.18942 12.8905 6.70553 12.8905ZM6.71173 3C7.00783 3 7.30509 3.09264 7.54618 3.27793C7.65004 3.35291 7.79368 3.48866 7.88681 3.57993L7.98037 3.67345C9.02079 4.64858 10.5879 7.07394 11.0911 8.30444C11.1007 8.30444 11.3523 8.91922 11.4032 9.28974L11.4118 9.38409V9.43041C11.4118 9.96371 11.1133 10.4626 10.6335 10.7179C10.3702 10.8581 9.60478 10.9852 9.59308 10.997C8.90727 11.1016 7.85514 11.1704 6.70003 11.1704C5.48757 11.1704 4.38981 11.1016 3.71453 10.9733C3.70282 10.9733 3.08606 10.8462 2.88009 10.7642C2.58282 10.6372 2.3312 10.4044 2.17087 10.1145C2.05618 9.88294 2 9.63827 2 9.38409C2.01053 9.11685 2.18257 8.618 2.26215 8.42083C2.76539 7.12026 4.41204 4.6367 5.41852 3.68532C5.57886 3.5226 5.77313 3.34801 5.81877 3.30169C6.07039 3.10452 6.37936 3 6.71173 3ZM17.2947 4.375C17.9113 4.375 18.4179 4.84999 18.4788 5.45938L18.4849 5.58295L18.2286 10.1618C18.2286 10.6856 17.8108 11.1096 17.2947 11.1096C16.8155 11.1096 16.421 10.744 16.3671 10.2724L16.3608 10.1618L16.1033 5.58295C16.1033 4.91543 16.637 4.375 17.2947 4.375Z"
                  fill="black"
                />
              </svg>
              Exchange
            </a>
          </li>
          <li class="mb-3">
            <a class="nav__menu flex flex-align-center">
              <svg
                width="27"
                height="24"
                viewBox="0 0 27 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3541 0C23.9526 0 26.6667 2.64612 26.6667 7.17573H21.0252V7.22196C18.4069 7.22196 16.2844 9.29132 16.2844 11.844C16.2844 14.3967 18.4069 16.4661 21.0252 16.4661H26.6667V16.882C26.6667 21.3539 23.9526 24 19.3541 24H7.31259C2.71407 24 0 21.3539 0 16.882V7.11796C0 2.64612 2.71407 0 7.31259 0H19.3541ZM25.6711 9.16322C26.2209 9.16322 26.6667 9.59778 26.6667 10.1338V13.5079C26.6603 14.0414 26.2183 14.4723 25.6711 14.4786H21.1319C19.8064 14.496 18.6473 13.6112 18.3467 12.3524C18.1961 11.5711 18.4075 10.7648 18.9241 10.1496C19.4407 9.53449 20.2098 9.17343 21.0252 9.16322H25.6711ZM21.6652 10.7232H21.2267C20.9574 10.7201 20.6981 10.8222 20.5066 11.0067C20.3151 11.1912 20.2074 11.4428 20.2074 11.7053C20.2074 12.2561 20.6618 12.7043 21.2267 12.7106H21.6652C22.2281 12.7106 22.6844 12.2657 22.6844 11.7169C22.6844 11.1681 22.2281 10.7232 21.6652 10.7232ZM13.843 5.18825H6.31704C5.75871 5.18822 5.30427 5.62613 5.29778 6.17044C5.29778 6.72117 5.7522 7.1694 6.31704 7.17573H13.843C14.4059 7.17573 14.8622 6.73082 14.8622 6.18199C14.8622 5.63317 14.4059 5.18825 13.843 5.18825Z"
                  fill="black"
                />
              </svg>
              Wallet
            </a>
          </li>
          <li class="mb-3">
            <a class="nav__menu flex flex-align-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.4498 3.7803C15.4098 4.0303 15.3898 4.2803 15.3898 4.5303C15.3898 6.7803 17.2098 8.5993 19.4498 8.5993C19.6998 8.5993 19.9398 8.5703 20.1898 8.5303V16.5993C20.1898 19.9903 18.1898 22.0003 14.7898 22.0003H7.40076C3.99976 22.0003 1.99976 19.9903 1.99976 16.5993V9.2003C1.99976 5.8003 3.99976 3.7803 7.40076 3.7803H15.4498ZM15.6508 9.8603C15.3798 9.8303 15.1108 9.9503 14.9498 10.1703L12.5308 13.3003L9.75976 11.1203C9.58976 10.9903 9.38976 10.9393 9.18975 10.9603C8.99076 10.9903 8.81076 11.0993 8.68975 11.2593L5.73076 15.1103L5.66976 15.2003C5.49976 15.5193 5.57976 15.9293 5.87976 16.1503C6.01976 16.2403 6.16976 16.3003 6.33976 16.3003C6.57076 16.3103 6.78976 16.1893 6.92976 16.0003L9.43975 12.7693L12.2898 14.9103L12.3798 14.9693C12.6998 15.1393 13.0998 15.0603 13.3298 14.7593L16.2198 11.0303L16.1798 11.0503C16.3398 10.8303 16.3698 10.5503 16.2598 10.3003C16.1508 10.0503 15.9098 9.8803 15.6508 9.8603ZM19.5899 2C20.9199 2 21.9999 3.08 21.9999 4.41C21.9999 5.74 20.9199 6.82 19.5899 6.82C18.2599 6.82 17.1799 5.74 17.1799 4.41C17.1799 3.08 18.2599 2 19.5899 2Z"
                  fill="black"
                />
              </svg>
              Statistics
            </a>
          </li>
          <li class="mb-3">
            <a class="nav__menu flex flex-align-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739ZM12 2C14.9391 2 17.294 4.35402 17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2Z"
                  fill="black"
                />
              </svg>
              Profile
            </a>
          </li>
          <li class="mb-3">
            <a class="nav__menu flex flex-align-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7171 2.00012C13.4734 2.00012 14.1581 2.42012 14.5362 3.04012C14.7201 3.34012 14.8428 3.71012 14.8121 4.10012C14.7917 4.40012 14.8837 4.70012 15.0472 4.98012C15.5684 5.83012 16.7232 6.15012 17.6225 5.67012C18.6342 5.09012 19.9117 5.44012 20.4942 6.43012L21.1789 7.61012C21.7716 8.60012 21.4446 9.87012 20.4227 10.4401C19.554 10.9501 19.2474 12.0801 19.7686 12.9401C19.9321 13.2101 20.1161 13.4401 20.4022 13.5801C20.7599 13.7701 21.0358 14.0701 21.23 14.3701C21.6081 14.9901 21.5775 15.7501 21.2096 16.4201L20.4942 17.6201C20.1161 18.2601 19.4109 18.6601 18.6853 18.6601C18.3277 18.6601 17.9291 18.5601 17.6021 18.3601C17.3364 18.1901 17.0298 18.1301 16.7027 18.1301C15.691 18.1301 14.8428 18.9601 14.8121 19.9501C14.8121 21.1001 13.8719 22.0001 12.6967 22.0001H11.3068C10.1213 22.0001 9.18113 21.1001 9.18113 19.9501C9.16069 18.9601 8.31247 18.1301 7.30073 18.1301C6.96348 18.1301 6.6569 18.1901 6.40141 18.3601C6.07438 18.5601 5.6656 18.6601 5.31813 18.6601C4.58232 18.6601 3.87717 18.2601 3.49905 17.6201L2.7939 16.4201C2.41577 15.7701 2.39533 14.9901 2.77346 14.3701C2.93697 14.0701 3.24356 13.7701 3.59102 13.5801C3.87717 13.4401 4.06112 13.2101 4.23486 12.9401C4.74584 12.0801 4.43925 10.9501 3.57059 10.4401C2.55885 9.87012 2.23182 8.60012 2.81434 7.61012L3.49905 6.43012C4.09178 5.44012 5.35901 5.09012 6.38097 5.67012C7.27007 6.15012 8.42488 5.83012 8.94608 4.98012C9.10959 4.70012 9.20157 4.40012 9.18113 4.10012C9.16069 3.71012 9.27311 3.34012 9.46728 3.04012C9.8454 2.42012 10.5301 2.02012 11.2761 2.00012H12.7171ZM12.012 9.18012C10.4075 9.18012 9.10959 10.4401 9.10959 12.0101C9.10959 13.5801 10.4075 14.8301 12.012 14.8301C13.6164 14.8301 14.8837 13.5801 14.8837 12.0101C14.8837 10.4401 13.6164 9.18012 12.012 9.18012Z"
                  fill="black"
                />
              </svg>
              Settings
            </a>
          </li>
        </ul>
        <ul class="nav__logouts flex flex-column flex-justify-between">
          <li>
            <a class="nav__logout flex flex-align-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4927 2C13.9753 2 16 3.99 16 6.44V11.23H9.89535C9.45785 11.23 9.11192 11.57 9.11192 12C9.11192 12.42 9.45785 12.77 9.89535 12.77H16V17.55C16 20 13.9753 22 11.4724 22H6.51744C4.02471 22 2 20.01 2 17.56V6.45C2 3.99 4.03488 2 6.52762 2H11.4927ZM18.5402 8.5502C18.8402 8.2402 19.3302 8.2402 19.6302 8.5402L22.5502 11.4502C22.7002 11.6002 22.7802 11.7902 22.7802 12.0002C22.7802 12.2002 22.7002 12.4002 22.5502 12.5402L19.6302 15.4502C19.4802 15.6002 19.2802 15.6802 19.0902 15.6802C18.8902 15.6802 18.6902 15.6002 18.5402 15.4502C18.2402 15.1502 18.2402 14.6602 18.5402 14.3602L20.1402 12.7702H16.0002V11.2302H20.1402L18.5402 9.6402C18.2402 9.3402 18.2402 8.8502 18.5402 8.5502Z"
                  fill="black"
                />
              </svg>
              Logout
            </a>
          </li>
        </ul>
      </nav> */}
      <section class="section__main">
        <div class="flex search mb-8" style={{ display: "none" }}>
          <button class="bg-white search__button">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.7388 2C17.1088 2 21.4768 6.368 21.4768 11.738C21.4768 14.2715 20.5045 16.5823 18.9134 18.3165L22.0442 21.4407C22.3372 21.7337 22.3382 22.2077 22.0452 22.5007C21.8992 22.6487 21.7062 22.7217 21.5142 22.7217C21.3232 22.7217 21.1312 22.6487 20.9842 22.5027L17.8156 19.343C16.1488 20.6778 14.0354 21.477 11.7388 21.477C6.36876 21.477 1.99976 17.108 1.99976 11.738C1.99976 6.368 6.36876 2 11.7388 2ZM11.7388 3.5C7.19576 3.5 3.49976 7.195 3.49976 11.738C3.49976 16.281 7.19576 19.977 11.7388 19.977C16.2808 19.977 19.9768 16.281 19.9768 11.738C19.9768 7.195 16.2808 3.5 11.7388 3.5Z"
                fill="#919EAB"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search anything"
            class="search__input"
          />
        </div>
        <div class="bg-primary flex flex-justify-between flex-align-center banner">
          <div>
            <h1 class="text-5xl text-white mb-2">
              Hello <span style={{ color: "gold" }}>{account.firstname}</span>,
            </h1>
            <h1 class="text-3xl text-white mb-2">Manage your</h1>
            <h1 class="text-3xl text-white mb-4">FlipGem Portfolio</h1>
          </div>
          <div
            class="banner__img"
            style={{ marginRight: "-10rem", marginTop: "1.5rem" }}
          >
            <img src="./flipgem.png" height={320} alt="banner" />
          </div>
        </div>
        <h2 class="text-2xl mb-5">
          My Portfolio{" "}
          <Tooltip title="Copy Wallet Address">
            <Button onClick={handleCopy}>
              <CopyAllOutlined />
            </Button>
          </Tooltip>{" "}
        </h2>
        <div class="portos">
          <div class="flex flex-justify-begin flex-align-center bg-white porto">
            <img
              src="./gem.png"
              height={80}
              style={{ marginRight: "1rem" }}
              alt=""
            />
            <div class="mt-1">
              <div class="flex flex-align-center flex-justify-between mb-2">
                <p class="text-xl mr-4">
                  <b>FGM</b>
                  <span class="text-gray-500 text-sm"> / USDT</span>
                </p>
                <p class="text-xl">0.34 USD</p>
              </div>
              <div class="flex flex-align-center flex-justify-between">
                <small class="text-gray-500">FlipGem</small>
                <small class="flex flex-align-center text-success">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="rotate-180"
                  >
                    <path
                      d="M10.869 16.6308C10.811 16.5743 10.563 16.3609 10.359 16.1622C9.076 14.9971 6.976 11.9576 6.335 10.3668C6.232 10.1252 6.014 9.51437 6 9.18802C6 8.8753 6.072 8.5772 6.218 8.29274C6.422 7.93814 6.743 7.65368 7.122 7.49781C7.385 7.39747 8.172 7.2416 8.186 7.2416C9.047 7.08573 10.446 7 11.992 7C13.465 7 14.807 7.08573 15.681 7.21335C15.695 7.22796 16.673 7.38383 17.008 7.55431C17.62 7.86702 18 8.47784 18 9.13151V9.18802C17.985 9.61374 17.605 10.509 17.591 10.509C16.949 12.0141 14.952 14.9834 13.625 16.1768C13.625 16.1768 13.284 16.5129 13.071 16.659C12.765 16.887 12.386 17 12.007 17C11.584 17 11.19 16.8724 10.869 16.6308Z"
                      fill="#6DD64D"
                    />
                  </svg>
                  $0.32 (2%)
                </small>
              </div>
            </div>
          </div>
        </div>
        <div class="charts">
          <div class="flex flex-justify-between flex-align-center mb-4">
            <h3 class="text-lg flex flex-align-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2"
              >
                <path
                  d="M15.4498 3.7803C15.4098 4.0303 15.3898 4.2803 15.3898 4.5303C15.3898 6.7803 17.2098 8.5993 19.4498 8.5993C19.6998 8.5993 19.9398 8.5703 20.1898 8.5303V16.5993C20.1898 19.9903 18.1898 22.0003 14.7898 22.0003H7.40076C3.99976 22.0003 1.99976 19.9903 1.99976 16.5993V9.2003C1.99976 5.8003 3.99976 3.7803 7.40076 3.7803H15.4498ZM15.6508 9.8603C15.3798 9.8303 15.1108 9.9503 14.9498 10.1703L12.5308 13.3003L9.75976 11.1203C9.58976 10.9903 9.38976 10.9393 9.18975 10.9603C8.99076 10.9903 8.81076 11.0993 8.68975 11.2593L5.73076 15.1103L5.66976 15.2003C5.49976 15.5193 5.57976 15.9293 5.87976 16.1503C6.01976 16.2403 6.16976 16.3003 6.33976 16.3003C6.57076 16.3103 6.78976 16.1893 6.92976 16.0003L9.43975 12.7693L12.2898 14.9103L12.3798 14.9693C12.6998 15.1393 13.0998 15.0603 13.3298 14.7593L16.2198 11.0303L16.1798 11.0503C16.3398 10.8303 16.3698 10.5503 16.2598 10.3003C16.1508 10.0503 15.9098 9.8803 15.6508 9.8603ZM19.5899 2C20.9199 2 21.9999 3.08 21.9999 4.41C21.9999 5.74 20.9199 6.82 19.5899 6.82C18.2599 6.82 17.1799 5.74 17.1799 4.41C17.1799 3.08 18.2599 2 19.5899 2Z"
                  fill="#4062FF"
                />
              </svg>
              <span class="mt-2">Total Portfolio</span>
            </h3>
            <select value="time_range" class="text-sm">
              <option name="Weekly" value="0">
                Weekly
              </option>
              <option name="Monthly" value="1">
                Monthly
              </option>
              <option name="Quarterly" value="2">
                Quarterly
              </option>
              <option name="Anually" value="3">
                Anually
              </option>
            </select>
          </div>
          <canvas id="myChart"></canvas>
        </div>
      </section>
      <section class="section__account">
        <div
          class="flex flex-align-center flex-justify-between mb-8 option"
          style={{ display: "none" }}
        >
          <div class="notif">
            <svg
              width="32"
              height="32"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.96318 17.2279C7.46309 17.1222 10.5093 17.1222 11.0092 17.2279C11.4366 17.3266 11.8987 17.5573 11.8987 18.0608C11.8738 18.5402 11.5926 18.9653 11.204 19.2352C10.7001 19.628 10.1088 19.8767 9.49057 19.9664C9.14868 20.0107 8.81276 20.0117 8.48279 19.9664C7.86362 19.8767 7.27227 19.628 6.76938 19.2342C6.37978 18.9653 6.09852 18.5402 6.07367 18.0608C6.07367 17.5573 6.53582 17.3266 6.96318 17.2279ZM9.04522 0C11.1254 0 13.2502 0.987019 14.5125 2.62466C15.3314 3.67916 15.7071 4.73265 15.7071 6.3703V6.79633C15.7071 8.05226 16.039 8.79253 16.7695 9.64559C17.3231 10.2741 17.5 11.0808 17.5 11.956C17.5 12.8302 17.2128 13.6601 16.6373 14.3339C15.884 15.1417 14.8215 15.6573 13.7372 15.747C12.1659 15.8809 10.5937 15.9937 9.0005 15.9937C7.40634 15.9937 5.83505 15.9263 4.26375 15.747C3.17846 15.6573 2.11602 15.1417 1.36367 14.3339C0.78822 13.6601 0.5 12.8302 0.5 11.956C0.5 11.0808 0.677901 10.2741 1.23049 9.64559C1.98384 8.79253 2.29392 8.05226 2.29392 6.79633V6.3703C2.29392 4.68834 2.71333 3.58852 3.577 2.51186C4.86106 0.941697 6.91935 0 8.95577 0H9.04522Z"
                fill="#637381"
              />
            </svg>
            <svg
              width="15"
              height="15"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="notif__active"
            >
              <circle cx="5" cy="5" r="5" fill="#FF4842" />
            </svg>
          </div>
          <div
            class="flex flex-align-center flex-justify-between"
            style={{ display: "none" }}
          >
            <img
              class="profile__pic mr-2"
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="Timothy"
              width="32"
              height="32"
            />
            <p class="text-bold mr-2">Timothy</p>
            <svg
              width="20"
              height="20"
              viewBox="5 5 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.869 16.6308C10.811 16.5743 10.563 16.3609 10.359 16.1622C9.076 14.9971 6.976 11.9576 6.335 10.3668C6.232 10.1252 6.014 9.51437 6 9.18802C6 8.8753 6.072 8.5772 6.218 8.29274C6.422 7.93814 6.743 7.65368 7.122 7.49781C7.385 7.39747 8.172 7.2416 8.186 7.2416C9.047 7.08573 10.446 7 11.992 7C13.465 7 14.807 7.08573 15.681 7.21335C15.695 7.22796 16.673 7.38383 17.008 7.55431C17.62 7.86702 18 8.47784 18 9.13151V9.18802C17.985 9.61374 17.605 10.509 17.591 10.509C16.949 12.0141 14.952 14.9834 13.625 16.1768C13.625 16.1768 13.284 16.5129 13.071 16.659C12.765 16.887 12.386 17 12.007 17C11.584 17 11.19 16.8724 10.869 16.6308Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <h2 class="text-2xl mb-4">Accounts</h2>
        <div class="card flex flex-align-center flex-justify-center flex-column mb-4">
          <img src="./gem.png" height={50} alt="" />
          <h2 class="text-2xl text-white text-bold mt-2 mb-2">{flipgem} FGM</h2>
          <p class="text-bold text-white flex flex-align-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="rotate-180"
            >
              <path
                d="M10.869 16.6308C10.811 16.5743 10.563 16.3609 10.359 16.1622C9.076 14.9971 6.976 11.9576 6.335 10.3668C6.232 10.1252 6.014 9.51437 6 9.18802C6 8.8753 6.072 8.5772 6.218 8.29274C6.422 7.93814 6.743 7.65368 7.122 7.49781C7.385 7.39747 8.172 7.2416 8.186 7.2416C9.047 7.08573 10.446 7 11.992 7C13.465 7 14.807 7.08573 15.681 7.21335C15.695 7.22796 16.673 7.38383 17.008 7.55431C17.62 7.86702 18 8.47784 18 9.13151V9.18802C17.985 9.61374 17.605 10.509 17.591 10.509C16.949 12.0141 14.952 14.9834 13.625 16.1768C13.625 16.1768 13.284 16.5129 13.071 16.659C12.765 16.887 12.386 17 12.007 17C11.584 17 11.19 16.8724 10.869 16.6308Z"
                fill="white"
              />
            </svg>
            $0.32 (2%)
          </p>
        </div>
        <div class="flex flex-align-center flex-justify-between mb-8 ">
          <Link to="/coupons" style={{ textDecoration: "none" }}>
            <button
              style={{ cursor: "pointer", width: "277px" }}
              class="button bg-primary text-white flex flex-align-center flex-justify-center px-4 py-4"
            >
              <ShoppingBagRounded style={{ fontSize: "1.5rem" }} />
              <span style={{ fontSize: "1.5rem" }}>Coupons</span>
            </button>
          </Link>
          {/* <button
            style={{ width: "8rem", cursor:'pointer' }}
            class="button bg-secondary text-white flex flex-align-center px-4 py-4"
          >
            <ShoppingCartOutlined style={{ marginLeft: "0.8rem" }} />
            <span>Store</span>
          </button> */}
        </div>
        {isloading ? (
          <div
            className="text-2xl mt-6 mb-4 text-bold"
            style={{ color: "#2874f0" }}
          >
            Fetching Transactions
          </div>
        ) : transactions.length !== 0 ? (
          <h2 class="text-2xl mt-6 mb-4">Recent Transactions</h2>
        ) : (
          <div>
            {" "}
            <h2 class="text-2xl mt-6 mb-4">Recent Transactions</h2>
            <p
              className="text-bold"
              style={{ color: "#ADADC9", marginLeft: "3rem" }}
            >
              No Transactions Yet
            </p>
          </div>
        )}
        <div class="transactions">
          {transactions.map((transaction) => (
            <div class="transaction flex flex-align-center flex-justify-between mb-4">
              <div class="flex flex-align-center flex-justify-between">
                <img src="./gem.png" height={45} alt="" className="mr-3" />
                <div style={{ fontSize: "1rem" }}>
                  {transaction.to === account.walletAddress ? (
                    <p class="text-bold">
                      FlipGem <br /> Rewarded
                    </p>
                  ) : (
                    <p class="text-bold">
                      FlipGem <br /> Deducted
                    </p>
                  )}

                  <small class="text-bold text-gray-500">
                    {transaction.timestamp}
                  </small>
                </div>
              </div>
              {transaction.to === account.walletAddress ? (
                <p class="text-bold text-success">
                  +{transaction.amount} <br /> FGM
                </p>
              ) : (
                <p class="text-bold" style={{ color: "red" }}>
                  -{transaction.amount} <br /> FGM
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
