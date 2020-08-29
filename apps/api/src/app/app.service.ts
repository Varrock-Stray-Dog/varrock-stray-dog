import { Injectable } from '@nestjs/common';
import { Message } from '@varrock-stray-dog/interfaces';

@Injectable()
export class AppService {
  getData(): Message {
	return { message: 'Welcome to api!' };
  }
}
