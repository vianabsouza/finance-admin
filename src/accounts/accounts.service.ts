import { Injectable } from '@nestjs/common';
import { Account } from './account.model';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AccountsService {
  private readonly filePath = path.resolve('src/accounts/accounts.json');

  private readAccounts(): Account[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Account[]
  }

  private writeAccounts(accounts: Account[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8');
  }

  createAccount(name: string, balance: number): Account {
    const accounts = this.readAccounts();
    const newAccount = {
      id: accounts.length > 0 ? accounts[accounts.length - 1].id  + 1 : 1,
      name,
      balance
    }
    accounts.push(newAccount);
    this.writeAccounts(accounts);
    return newAccount;
  }

  findById(id: number): Account {
    const accounts = this.readAccounts();
    const account = accounts.find(account => account.id === Number(id));

    if(!account) {
      console.log(`Account with id ${id} not found`)
    }

    return account;
  }

  updateBalance(id: number, newBalance: number): Account {
    const accounts = this.readAccounts();
    const account = accounts.find(account => account.id === Number(id));

    account.balance = newBalance;
    this.writeAccounts(accounts);

    return account;
  }

  removeAccount(id: number): void {
    const accounts = this.readAccounts();
    const accountIndex = accounts.findIndex(account => account.id === Number(id));

    accounts.splice(accountIndex, 1);
    this.writeAccounts(accounts);
  }
}
