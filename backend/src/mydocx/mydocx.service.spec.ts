import { Test, TestingModule } from '@nestjs/testing';
import { MydocxService } from './mydocx.service';

describe('MydocxService', () => {
  let service: MydocxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MydocxService],
    }).compile();

    service = module.get<MydocxService>(MydocxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
