import { Test, TestingModule } from '@nestjs/testing';
import { LeasecontractController } from './leasecontract.controller';
import { LeasecontractService } from './leasecontract.service';

describe('LeasecontractController', () => {
  let controller: LeasecontractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeasecontractController],
      providers: [LeasecontractService],
    }).compile();

    controller = module.get<LeasecontractController>(LeasecontractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
