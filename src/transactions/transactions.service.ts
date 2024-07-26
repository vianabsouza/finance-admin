import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction, TransactionType } from './transaction.model';
import * as path from 'path';
import * as fs from 'fs';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class TransactionsService {
  private readonly filePath = path.resolve('src/transactions/transactions.json');
  private idCounter: number;

  constructor(private readonly accountsService: AccountsService) {
    const transactions = this.readTransactions();
    this.idCounter = transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1;
  }

  private readTransactions(): Transaction[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Transaction[]
  }

  private writeTransactions(transactions: Transaction[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(transactions, null, 2), 'utf8')
  }

  createTransaction(accountId: number, amount: number, type: TransactionType): Transaction {
    const account = this.accountsService.findById(accountId)
    if(!account) {
      throw new NotFoundException('Account not found');
    }

    const newTransaction = new Transaction(this.idCounter++, accountId, amount, type, new Date);

    const transactions = this.readTransactions();
    transactions.push(newTransaction);
    this.writeTransactions(transactions);
    return newTransaction;
  }

  findAll(): Transaction[] {
    return this.readTransactions();
  }
}
