# Base
FROM node:14 as base
	LABEL author="Jurien Hamaker <jurien@kings-dev.io>"

	WORKDIR /opt/app

	ENV NODE_ENV development

	ENTRYPOINT ["yarn"]

# Development
FROM base as development

	EXPOSE 4200 3000

# Build base
FROM base as build-base
	COPY . /opt/app

	# RUN yarn

# Production base
FROM base as production-base
	ENV NODE_ENV production
	COPY --from=build-base /opt/app/node_modules node_modules
	COPY --from=build-base /opt/app/package.json .

	CMD ["node:start"]

# API
FROM build-base as build-api
	RUN yarn prisma:generate
	RUN yarn build:api

FROM production-base as production-api
	COPY --from=build-api /opt/app/prisma prisma
	COPY --from=build-api /opt/app/dist/api dist

# BOT
FROM build-base as build-bot
	RUN yarn build:bot

FROM production-base as production-bot
	COPY --from=build-bot /opt/app/dist/bot dist

# WEB
FROM build-base as build-web
	RUN yarn build:web

FROM nginx as production-web
	COPY --from=build-web /opt/app/dist/web/ /usr/share/nginx/html
	COPY --from=build-web /opt/app/nginx.conf /etc/nginx/conf.d/default.conf
