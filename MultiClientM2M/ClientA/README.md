# Client A
A console application representing a customer who requires an access token with their associated permissions and customer id.

## Running Locally

1. Install the dependencies with npm:

```bash
npm install
```

2. Rename `.env.example` to `.env` and replace or check the following values. 

- `AUTH_API_URL` - absolute URL to the Authentication Service (ie: `http://localhost:3001`)
- `M2M_CLIENT_ID` - the ClientA application's client id
- `M2M_CLIENT_SECRET` - the ClientA application's client secret
- `PERMISSIONS` - The permissions assigned to ClientA when configuring the API

```bash
mv .env.example .env
```

3. Run the app:

```bash
npm start
```

The script will execute, retrieveing the M2M token, decoding it, and printing it's contents to the console.  

