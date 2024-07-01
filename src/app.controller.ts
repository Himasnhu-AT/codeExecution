import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { executeCodeDto } from './exec.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('execute')
  async executeCode(@Body() dto: executeCodeDto): Promise<any> {
    return this.appService.executeCode(dto.code, dto.TestCases);
  }
}
