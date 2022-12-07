# Adopet

## What is adopet?

Adopet is a web app to make easier to animal shelters to find a new home for their animals.

## Why adopet?

- Thousands of animals need a home
- Shelters don’t have the money to advertise themselves or to even maintain their own animals
- Shelters struggle to find the perfect adopter for their animals

## Getting started

### Front end

#### Environment variables

- **VITE_API_URL**: URL to the back end API p.e. http://localhost:4000/api
- **VITE_GOOGLE_MAPS_API_KEY**: Google Maps API Key
- **VITE_GOOGLE_CLIENT_ID**: Client ID of your Google OAuth application
- **VITE_GOOGLE_CLIENT_SECRET**: Client secret of your Google OAuth application

#### Running the app

First of all you have to install node dependencies

```bash
npm i
```

Then run the app

```bash
npm run dev
```

Your app by default should be running in http://localhost:5173/

### Back end

#### Environment variables

- **PORT:** The port the server will run in

- **DATABASE_URL:** The connection URL for the database (only tested in postgres and it has to be a SQL DB). If you're running the postgres container declared in docker-compose this must be "postgres://postgres:postgres@postgres:5432/adopet"

- **TOKEN_KEY:** The key that will be used to encrypt the tokens

- **ENVIRONMENT:** The environment the app is in (production or development)

- **GOOGLE_SECRET:** Client secret of your Google OAuth application

- **GOOGLE_EMAIL**: The email of the owner of your Google OAuth application

##### Testing

- **ADMIN_TOKEN:** The admin token in the database

- **GOOGLE_TOKEN:** Token for an existing google account in the database

- **GOOGLE_TOKEN_NON_EXISTING:** Token for a non existing google account in the database

- **GOOGLE_USER_ID**: Google ID to create an account with

#### Running the app

First of all you have to install node dependencies

```bash
npm i
```

Then run the app

```bash
npm run docker:compose
```

Your app by default should be running in [http://localhost:[ENV-PORT]/]


