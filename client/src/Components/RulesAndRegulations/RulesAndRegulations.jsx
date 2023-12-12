import React from "react";
import ReactPlayer from "react-player";
import "./RulesAndRegulations.css";

const RulesPage = () => {
  const [dropDown1, setDropDown1] = React.useState(true);
  const [dropDown2, setDropDown2] = React.useState(true);
  const [dropDown3, setDropDown3] = React.useState(true);
  const [dropDown4, setDropDown4] = React.useState(true);
  return (
    <div className="rules">
      <center>
        <h1>
          <b>Loyalty and Rewards Program Rules</b>
        </h1>
      </center>
      <p>
        Welcome to our blockchain-enabled loyalty and rewards program. This
        program aims to provide our users with a secure, transparent, and
        engaging way to earn and redeem loyalty points using blockchain
        technology.
        <br />
        <br />
        Embark on a revolutionary loyalty adventure with our blockchain-powered
        program, enhancing your rewards experience. Seamlessly embedded in your
        shopping realm, it guarantees transparency and security. Through
        purchases, referrals, and social engagement, earn tokens that are
        meticulously tracked on the blockchain. Our partners contribute to an
        enriched ecosystem, while governance thrives through smart contracts.
        Tokens possess a dynamic essence, motivating swift interaction before
        their gradual expiration. Dive into a realm where loyalty is elevated
        and rewards are fueled by innovation, inviting you to a journey of
        seamless earning and redemption.
        <br />
        <span style={{ fontWeight: "bolder" }}>
          {" "}
          We are excited to have you join us on this journey to a more rewarding
          shopping experience.
        </span>
        <br />
        <br />
      </p>

      <ul>
        <li>
          <input
            type="checkbox"
            className="checkbox-input"
            onClick={() => setDropDown1(!dropDown1)}
            checked={dropDown1}
          />
          <i className="icon"></i>
          <h2>Token Issuance and Tokenomics</h2>
          <p>
            Our loyalty points are represented as fungible tokens on the
            blockchain. These tokens are earned through various actions such as
            purchases, referrals, or social media interactions. The tokenomics
            of our fungible tokens are carefully designed to ensure value and
            transparency for both users and partners. The value of each token is
            pegged to the equivalent of a certain monetary value, and the number
            of tokens issued depends on the user's engagement level.
            <br />• The name of our token is FlipGem
            <br />• FlipGem carries it's symbol as FGM
            <br />• FlipGem is a fungible token
            <br />• FlipGem can be earned by users through various actions -
            Shopping, social media interaction, etc..
            <br />• FlipGem has real market value and can be earned from our
            partners as well
            <br />• FlipGem can be spent to buy various coupons on FlipKart and
            from our partners
            <br />• FlipGem has a decaying period of 30 days
          </p>
        </li>
        <li>
          <input
            type="checkbox"
            onClick={() => setDropDown2(!dropDown2)}
            checked={dropDown2}
          />
          <i></i>
          <h2>User Actions and Rewards</h2>
          <p>
            Users can earn FlipGems by performing specific actions as outlined
            in our guidelines. Purchases from our E-commerce platform, referrals
            of new users, and positive engagement on social media are some of
            the actions that can lead to token rewards. Each action has a
            predefined number of tokens associated with it, and users can track
            their progress through our user-friendly dashboard.
          </p>
        </li>
        <li>
          <input
            type="checkbox"
            onClick={() => setDropDown3(!dropDown3)}
            checked={dropDown3}
          />
          <i></i>
          <h2>Partners and Sellers</h2>
          <p>
            Transparency is at the core of our loyalty program. Our blockchain
            technology ensures that all transactions involving fungible tokens
            are recorded on the blockchain, providing an immutable and
            transparent record of every transaction. The governance of the
            treasury, including token issuance and management, is carried out
            through smart contracts that follow predefined rules. Brands and
            users can easily verify the rules governing the issuance and usage
            of tokens, ensuring fairness and trust.
          </p>
        </li>
        <li>
          <input
            type="checkbox"
            onClick={() => setDropDown4(!dropDown4)}
            checked={dropDown4}
          />
          <i></i>
          <h2>Decaying Nature of Tokens</h2>
          <p>
            To encourage users to actively participate in the program, we have
            implemented a decaying nature for FlipGem. After a period of 30
            days, tokens in a user's wallet will gradually lose value,
            incentivizing users to redeem their tokens for rewards before they
            expire. This mechanism ensures that tokens are put to good use and
            contribute to a dynamic and engaging loyalty ecosystem.
          </p>
        </li>
      </ul>
      <div className="video-container">
        <ReactPlayer
          url="https://youtu.be/wbQdj5HC1Gs"
          width="920px"   // Adjust the width as needed
          height="380px" // Adjust the height as needed
          playing={false}
          loop
        />
      </div>
      <div style={{height:"4rem"}}>

      </div>
    </div>
  );
};

export default RulesPage;
