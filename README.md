BTC Currency website - CoinBoard.trade
==================================

## Project site
[CoinBoard.trade](https://coinboard.trade)

## Install via Docker
1. Clone repository:<br />
    ```bash
    git clone git@github.com:HiNeX/coinboard-trade.git ./coinboard
    ```
2. Go to folder with project and build image:<br />
    ```bash
    cd ./coinboard
    docker build -t <your username>/coinboard .
    ```
3. Start docker container:<br />
    ```bash
    docker run -p 3000:8080 -d <your username>/node-web-app
    ```

## Development mode
1. Clone repository:<br />
    ```bash
    git clone git@github.com:HiNeX/coinboard-trade.git ./coinboard
    ```
2. Go to folder with project and install dependencies:<br />
    ```bash
    cd ./coinboard
    npm install
    ```
3. Start project:<br />
    ```bash
    export NODE_ENV="development"
    npm run-script dev
    ```
