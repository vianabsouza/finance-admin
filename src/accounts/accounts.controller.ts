import { Body, Controller, Post } from '@nestjs/common';
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
}
