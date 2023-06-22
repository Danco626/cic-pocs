# Authentication Service Webapp
This application is an Express Node.js app. It supports user interactive login/signup via the [express-openid-connect SDK](https://github.com/auth0/express-openid-connect) while also working as a client credentials proxy. 



## Running Locally

1. Install the dependencies with npm:

```bash
npm install
```

2. Rename `.env.example` to `.env` and replace or check the following values. 

- `CLIENT_ID` - your Auth0 application client id
- `CLIENT_SECRET` - your Auth0 application client secret
- `ISSUER_BASE_URL` - absolute URL to your Auth0 application domain (ie: `https://accountName.auth0.com`)
- `SECRET` - a randomly rengerated string. You can generate one on the command line with the following `openssl rand -hex 32`
- `PORT` - the port where this application will run
- `AUDIENCE` - the API identifier


```bash
mv .env.example .env
```

3. Run the app:

```bash
npm start
```

The app will be served at `localhost:3001`.

