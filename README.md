# Payment - Datasub (Приложение приема платежей )

 Payment web app  based on [Nextjs](https://nextjs.org/) combined with [Express](https://expressjs.com/).

## Getting started

First you need [NodeJs](https://nodejs.org/en/download/) installed.
Clone this repo
```bash
git clone <repo link>
```
and run
```
yarn
```
to install the dependencies
Start the dev server by running
```
yarn run dev
```


## Environment Variables
The environment variables can be found and modified in the `.env` file:

demo file `.env.example`


```bash
# Port number
PORT=3000

# URL of the Mongo DB (example)
MONGODB_URI=mongodb://127.0.0.1:27017/datasub-payment
```

## Mainly Built With

- [Nextjs](https://nextjs.org/) as the main framework
- [ExpressJs](https://expressjs.com/) to build the REST-API backend
- [MongoDB](https://www.mongodb.com/) as database
- [Bootstrap 5](https://getbootstrap.com/) for the UI
and other node packages