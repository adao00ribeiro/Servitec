import { Module } from '@nestjs/common';
import { MydocxService } from './mydocx.service';

@Module({
  providers: [MydocxService],
  exports:[MydocxService]
})
export class MydocxModule {}
