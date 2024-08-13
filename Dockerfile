FROM node:20


ENV NEXT_PUBLIC_REACT_APP_BASE_URL=https://api.g-datalabs.com/
ENV NEXT_PUBLIC_OPEN_WEATHER_API_KEY=b9a5327fe46885fda6abefa8e7b61e7e
ENV NEXT_PUBLIC_BASE_URL=https://g-datalabs.vercel.app
ENV NEXT_PUBLIC_NODE_ENV=production

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","run","start"]