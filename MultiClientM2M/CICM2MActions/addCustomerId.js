exports.onExecuteCredentialsExchange = async (event, api) => {
      if(event.client.metadata?.customerId)
        api.accessToken.setCustomClaim("customerId", event.client.metadata.customerId);  
  };
  