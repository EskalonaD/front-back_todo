import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }


  // todo: remove when ready
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}
