import React, { useState } from "react";
import {Principal} from "@dfinity/principal";
import {token} from '../../../declarations/token';

function Balance() {
  const [inputValue,setInput]=useState("");
  const [balanceAmount,setBalance]=useState("");
  const [symbol,setSymbol]=useState("");
  const [isHidden,setIsHidden]=useState(true);
  
  async function handleClick() {
    console.log(inputValue);
    var principal=Principal.fromText(inputValue);
    var balance = await token.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setSymbol(await token.getSymbol());
    setIsHidden(false);
    // console.log(balance);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={e=>setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      {!isHidden ? <p>This account has a balance of {balanceAmount} {symbol}.</p> : null}
      {console.log(symbol)}
    </div>
  );
}

export default Balance;
