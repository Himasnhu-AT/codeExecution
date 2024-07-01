FROM node:20

WORKDIR /app

COPY package.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY . ./

RUN npm install -g @nestjs/cli

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start:prod"]