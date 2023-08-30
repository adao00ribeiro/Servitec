import { Test, TestingModule } from '@nestjs/testing';
import { ExtractzipService } from './extractzip.service';

describe('ExtractzipService', () => {
  let service: ExtractzipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtractzipService],
    }).compile();

    service = module.get<ExtractzipService>(ExtractzipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
