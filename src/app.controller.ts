import { Controller, Get,Post,Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('refresh_token')
  async refreshToken(){
    
    return this.appService.refreshToken()
  }

  @Get(':namePath')
  async getLeads(@Param('namePath') namePath:string){
    return (
    namePath === "leads" || 
    namePath === "contacts" || 
    namePath === "companies"
    )?this.appService.getPath(namePath):'page not found'
  }

  @Post(':namePath/add')
  async postData(@Param('namePath') namePath:string,@Body() data:object){
    let arr = []
    arr.push(data)
    await this.appService.postData(namePath, arr)
    
    return 'created'
  }
}
