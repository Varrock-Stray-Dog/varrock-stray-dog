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
	

# API
FROM build-base as build-api
	RUN yarn nx build api
	RUN yarn prisma:generate

FROM production-base as production-api
	COPY --from=build-api /opt/app/prisma prisma
	COPY --from=build-api /opt/app/dist/api dist

# BOT
FROM build-base as build-bot
	RUN yarn nx build bot

FROM production-base as production-bot
	COPY --from=build-bot /opt/app/dist/bot dist

# WEB
FROM build-base as build-web
	RUN yarn nx build web

FROM production-base as production-web
	COPY --from=build-bot /opt/app/dist/web dist
