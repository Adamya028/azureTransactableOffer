const express = require("express");
const router = express.Router();
const config = require("../../config/config");
const axios = require("axios");
const { check, validationResult } = require("express-validator");


const getToken= async ()=>{
  try {
    // URL for login
    let url = `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`;
    //Body for the token
    let params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", process.env.AZURE_CLIENT_ID);
    params.append("client_secret", process.env.AZURE_CLIENT_SECRET_ID);
    params.append("scope", "20e940b3-4c77-4b0b-9a53-9e16a1b010a7/.default");
    //axios request for the token generation
    let response = await axios({
      data: params.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      url: url,
      method: "POST",
    });
    accessToken = {
      token: response.data.access_token,
      expiry: response.data.expires_in,
      retrievedAt: new Date().getTime(),
    };
    return accessToken.token;
  } catch (error) {
    console.log(error);
    throw new Error("Could not retrieve token");
  }
}


// POST request to get subscription details
router.post(
  "/getOfferDetails",
    [check("token", "Marketplace token is Required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 //Get token for azure account
    let azureToken = await getToken();
   
let {token}=req.body
  // console.log(token)
   //Get subscription info according to the marketplace offer
   try {
    let url = `https://marketplaceapi.microsoft.com/api/saas/subscriptions/resolve?api-version=2018-08-31`;
    // axios request for subcription info
  
    let response = await axios({
      headers: {
        "Content-Type": "application/json",
        "x-ms-marketplace-token":token,
        "Authorization":`Bearer ${azureToken}`
      },
      url: url,
      method: "POST",
    });
    res.send(response.data)
  } catch (error) {
    console.log(error);
   console.log("Could not retrieve subscription info");
  }
  }
);



// POST request to get Activate a Subscription
router.post(
  "/getOfferDetails",
    [check("token", "Marketplace token is Required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 //Get token for azure account
    let azureToken = await getToken();
   
let {token}=req.body
  // console.log(token)
   //Get subscription info according to the marketplace offer
   try {
    let url = `https://marketplaceapi.microsoft.com/api/saas/subscriptions/resolve?api-version=2018-08-31`;
    // axios request for subcription info
  
    let response = await axios({
      headers: {
        "Content-Type": "application/json",
        "x-ms-marketplace-token":token,
        "Authorization":`Bearer ${azureToken}`
      },
      url: url,
      method: "POST",
    });
    res.send(response.data)
  } catch (error) {
    console.log(error);
   console.log("Could not retrieve subscription info");
  }
  }
);

router.post(
  "/Activate",
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
 //Get token for azure account
    let azureToken = await getToken();
   let {subscriptionId,plan}=req.body
   console.log()

  
   //Activate subscription 
   try {
    let url = `https://marketplaceapi.microsoft.com/api/saas/subscriptions/${subscriptionId}/activate?api-version=2018-08-31`;
   
    //axios request for Activation
    let response = await axios({
      data: {
        planId:plan
    },
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${azureToken}`
      },
      url: url,
      method: "POST",
    });
    res.send(response.data)
  } catch (error) {
    console.log(error);
    var error = JSON.stringify(error);
   console.log("Could not Actiavate");
  }
  }
);
module.exports = router;
