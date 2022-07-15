import React, { useState } from "react";
import {token,canisterId,createActor} from '../../../declarations/token';
import { AuthClient } from '@dfinity/auth-client';


function Faucet(props) {
  const [textShown,setTextShown]=useState("Gimme Gimme");
  const [isDisabled,setIsDisabled]=useState(false);


  async function handleClick(event) {
    setIsDisabled(true);
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId,{
      agentOptions:{
        identity,
      },
    }); 
    setTextShown( await authenticatedCanister.payOut() );
    // isDisabled=false;
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DK tokens here! Claim 10,000 DK coins to {props.loggedInPricipal}.</label>
      <p className="trade-buttons">
        <button id="btn-payout" 
        onClick={handleClick}
        disabled={isDisabled}
        >
          {textShown}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
