# Varrock Stray Dog

Varrock stray dog is a discord loot & pet tracking bot for Oldschool Runescape.

It utilizes the [@nrwl/nx](https://github.com/nrwl/nx) monotrepo structure for [NestJS](https://github.com/nestjs/nest) & [Angular](https://github.com/angular/angular)
Bot has been created with [Akairo](https://github.com/discord-akairo/discord-akairo) and a [custom nestjs library](https://github.com/Varrock-Stray-Dog/Varrock-Stray-Dog/tree/master/libs/discord)

[![Connect to discord](https://github.com/Varrock-Stray-Dog/Varrock-Stray-Dog/raw/master/apps/web/src/assets/connect-to-discord.png)](https://discord.com/oauth2/authorize?client_id=746303551722094623&scope=bot&permissions=268627008)
    
## Apps

### Website

The website for the bot, this will include a management system to manage your guild's loot & pets. This can also be done through commands.

### Api

The GraphQL api for the website which communicates with the bot to gain information and access to the database.

### Bot

The Discord Akairo bot which communicates with the database (Prisma & PostgresQL) and Discord (Akairo framework)


## Libraries

### @varrock-stray-dog/discord

This is a akairo wrapper for nestjs. This is under heavy development and mostly targeted for `Varrock Stray Dog`, this might not be the solution to your bot.
