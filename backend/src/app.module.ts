import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ExtractzipService } from './extractzip/extractzip.service';
import { CompanyModule } from './company/company.module';
import { PersonModule } from './person/person.module';
import { LeasecontractModule } from './leasecontract/leasecontract.module';
import { PdfService } from './pdf/pdf.service';
import { AddressModule } from './address/address.module';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { IdentityModule } from './identity/identity.module';
import { MydocxModule } from './mydocx/mydocx.module';



@Module({
  imports: [UserModule, PrismaModule, AuthModule, CompanyModule, PersonModule, LeasecontractModule, AddressModule, IdentityModule, MydocxModule],
  controllers: [AppController],
  providers: [AppService, ExtractzipService, PdfService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    /*
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
*/
  ],
})
export class AppModule { }
