import { Module } from '@nestjs/common';
import { LeasecontractService } from './leasecontract.service';
import { LeasecontractController } from './leasecontract.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LeasecontractController],
  providers: [LeasecontractService]
})
export class LeasecontractModule { }
