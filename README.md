BTC Currency website - CoinBoard.trade
==================================

## Install via Docker
1. Clone repository:
```bash
git clone git@github.com:HiNeX/coinboard-trade.git ./coinboard
```
2. Go to folder with project and build image: 
```bash
cd ./coinboard
docker build -t <your username>/coinboard .
```
3. Start docker container:
```bash
docker run -p 3000:8080 -d <your username>/node-web-app
```

## Development mode
1. Clone repository:
```bash
git clone git@github.com:HiNeX/coinboard-trade.git ./coinboard
```
2. Go to folder with project and install dependencies:
```bash
cd ./coinboard
npm install
```
3. Start project:
4. Go to folder with project and install dependencies:
```bash
export NODE_ENV="development"
npm run-script dev
```
## Project site
[CoinBoard.trade](https://coinboard.trade)
