BTC Currency website - CoinBoard.trade
==================================

## Project site
[CoinBoard.trade](https://coinboard.trade)

## Install via Docker
Clone repository:<br />
```bash
git clone git@github.com:HiNeX/coinboard-trade.git ./coinboard
```
Go to folder with project and build image:<br />
```bash
cd ./coinboard
docker build -t <your username>/coinboard .
```
Start docker container:<br />
```bash
docker run -p 3000:8080 -d <your username>/coinboard
```

## Development mode
Clone repository:<br />
```bash
git clone git@github.com:HiNeX/coinboard-trade.git ./coinboard
```
Go to folder with project and install dependencies:<br />
```bash
cd ./coinboard
npm install
```
Start project:<br />
```bash
export NODE_ENV="development"
npm run-script dev
```
