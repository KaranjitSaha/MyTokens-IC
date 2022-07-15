import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from '@dfinity/auth-client';


const init = async () => { 
  /* const authClient= await AuthClient.create();

  if(authClient.isAuthenticated){
    handleAuthenticated(authClient);
  }

  await authClient.login({
    identityProvider: "https://identity.ic0.app/#authorize",
    onSuccess:()=>{
      handleAuthenticated(authClient);
    }
  })
}

async function handleAuthenticated(authClient){
  const identity = await authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  console.log(userPrincipal);

  ReactDOM.render(<App loggedInPricipal={userPrincipal} />, document.getElementById("root"));*/
  ReactDOM.render(<App />, document.getElementById("root"));
} 


init();


