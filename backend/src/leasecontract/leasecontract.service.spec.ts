import { Test, TestingModule } from '@nestjs/testing';
import { LeasecontractService } from './leasecontract.service';

describe('LeasecontractService', () => {
  let service: LeasecontractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeasecontractService],
    }).compile();

    service = module.get<LeasecontractService>(LeasecontractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
