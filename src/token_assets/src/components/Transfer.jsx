import React, { useState } from "react";
import {token,canisterId,createActor} from '../../../declarations/token';
import {Principal} from '@dfinity/principal';
import { AuthClient } from '@dfinity/auth-client';

function Transfer() {
  const [amount, setAmount]=useState("");
  const [recipientId,setRecipientId]=useState("");
  const [isdisabled,setIsDisabled]=useState(false);
  const [isHidden, setIsHidden]=useState(true);
  const[feedback,setFeedback]=useState("");

  async function handleClick() {
    /* const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId,{
      agentOptions:{
        identity,
      },
    });  */
    setIsDisabled(true);
    setIsHidden(false);
    const recipient = Principal.fromText(recipientId);
    var status= await token.transfer(recipient,Number(amount));
    setIsDisabled(false);
    setFeedback(status);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(event)=>{setRecipientId(event.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(event)=>setAmount(event.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" 
          onClick={handleClick}
          disabled={isdisabled}
          >
            Transfer
          </button>
        </p>
        <p
        hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
