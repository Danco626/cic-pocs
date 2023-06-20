# Registration Webapp
This application is a custom registration application written in Node.js withb Express. It uses the [auth0.js SDK](https://github.com/auth0/auth0.js/) to register the user and initiate cross-origin authentication.

## Configure Application in CIC
1. This application DOES NOT need to be registered in CIC


## Running Locally

1. Install the dependencies with npm:

```bash
npm install
```

2. Rename `.env.example` to `.env` and replace or check the following values. 

- `BASE_URL` - the base URL of this application (http://localhost:3000)
- `ISSUER` -  tenant name and domain without the schema (ie: `accountName.auth0.com`)
- `PORT` - the port where this application will run


```bash
mv .env.example .env
```

3. Run the app:

```bash
npm start
```

The app will be served at `localhost:3001`.

