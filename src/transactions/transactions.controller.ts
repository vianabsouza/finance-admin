import { Body, Controller, Post } from '@nestjs/common';
import { Transaction, TransactionType } from './transaction.model';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService){}

  @Post()
  createTransaction(@Body('accountId') accountId: number, @Body('amount') amount: number, @Body('type') type: TransactionType): Transaction {
    return this.transactionService.createTransaction(accountId, amount, type)
  }
}
