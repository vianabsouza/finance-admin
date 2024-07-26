import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './account.model';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {
  }

  @Post()
  createAccount(@Body('name') name: string, @Body('balance') balance: number): Account {
    return this.accountsService.createAccount(name, balance);
  }

  @Get(':id')
  findById(@Param('id') id: number): Account {
    return this.accountsService.findById(id)
  }

  @Patch(':id/balance-update')
  updateBalance(@Param('id') id: number, @Body('balance') newBalance: number): Account {
    return this.accountsService.updateBalance(id, newBalance);
  }

  @Delete(':id')
  removeAccount(@Param('id', ParseIntPipe) id: number): void {
    return this.accountsService.removeAccount(id)
  }
}
