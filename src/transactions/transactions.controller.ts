import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Transaction, TransactionType } from './transaction.model';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService){}

  @Post()
  createTransaction(@Body('accountId') accountId: number, @Body('amount') amount: number, @Body('type') type: TransactionType): Transaction {
    return this.transactionService.createTransaction(accountId, amount, type)
  }

  @Get()
  findAll(): Transaction[] {
    return this.transactionService.findAll();
  }

  @Put(':id')
  updateTransaction(@Param('id', ParseIntPipe) id: number, @Body('amount') amount: number, @Body('type') type: TransactionType): Transaction {
    return this.transactionService.updateTransaction(id, amount, type);
  }
}
