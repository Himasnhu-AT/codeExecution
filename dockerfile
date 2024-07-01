FROM node:20

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . ./

RUN npm install -g @nestjs/cli

RUN pnpm build

CMD ["pnpm", "start:prod"]
