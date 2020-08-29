import { Command } from '@varrock-stray-dog/discord';

export class WhoAmICommand extends Command {
  constructor() {
	super('whoami', {
		aliases: ['whoami'],
	});
  }

  exec(message) {
	return message.reply('You are you!');
  }
}
