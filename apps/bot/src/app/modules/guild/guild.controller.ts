import { Controller } from '@nestjs/common';

import { GuildService } from './guild.service';

@Controller()
export class GuildController {
  constructor(private _service: GuildService) {}
}
