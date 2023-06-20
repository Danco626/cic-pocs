# Login Webapp

This application is an Express Node.js app. It supports signup through a custom registration app and login via the [express-openid-connect SDK](https://github.com/auth0/express-openid-connect).

## Configure Application in CIC
1. Create a [web application](https://auth0.com/docs/get-started/auth0-overview/create-applications/regular-web-apps)
2. Add the following URIs to the allowed callback URLs
    - http://localhost:3000/callback
    - http://localhost:3000/registrationCallback     
3. Add the following URI to the allowed logout URLs
    - http://localhost:3000
4. Add the following URI to the allowed web origins  
    - http://localhost:3001  
5. Enable Allow Cross-Origin Authentication and add the following URI to the allowed origins (CORS)  
    - http://localhost:3001  


## Running Locally

1. Install the dependencies with npm:

```bash
npm install
```

2. Rename `.env.example` to `.env` and replace or check the following values. 

- `BASE_URL` - the base URL of this application (http://localhost:3000)
- `CLIENT_ID` - your Auth0 application client id
- `CLIENT_SECRET` - your Auth0 application client secret
- `ISSUER_BASE_URL` - absolute URL to your Auth0 application domain (ie: `https://accountName.auth0.com`)
- `SECRET` - a randomly rengerated string. You can generate one on the command line with the following `openssl rand -hex 32`
- `PORT` - the port where this application will run
- `REGISTER_URL` - the the Registration application's URL (http://localhost:3001)
- `REDIRECT_URI` - the custom callback URL

```bash
mv .env.example .env
```

3. Run the app:

```bash
npm start
```

The app will be served at `localhost:3000`.

