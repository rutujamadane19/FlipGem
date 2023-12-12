import React, { useState } from 'react';
import styled from 'styled-components';

// Import the styles from the CSS file
import './Theme.css';

const FormContainer = styled.div`
  /* Apply the class name from the CSS */
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  /* Apply the class name from the CSS */
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    border:2px solid gold; /* Customize focus ring color */
    outline: none; /* Remove the default focus outline */
  
  }
`;

const Button = styled.button`
  /* Apply the class name from the CSS */
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const TokenIssuePortalForm = () => {
  const [userAddress, setUserAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [accessKey, setAccessKey] = useState('');

  const handleTransfer = () => {
    // Handle token transfer logic here
    console.log('Transferring tokens...');
  };

  return (
    <FormContainer className="form-container">
      <Input
        type="text"
        placeholder="User Address"
        className="input"
        value={userAddress}

        onChange={(e) => setUserAddress(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Amount"
        className="input"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Access Key"
        className="input"
        value={accessKey}
        onChange={(e) => setAccessKey(e.target.value)}
      />
      <Button className="button" onClick={handleTransfer}>
        Transfer Tokens
      </Button>
    </FormContainer>
  );
};

export default TokenIssuePortalForm;
