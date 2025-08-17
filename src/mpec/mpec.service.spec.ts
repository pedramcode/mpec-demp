import { Test, TestingModule } from '@nestjs/testing';
import { MpecService } from './mpec.service';

describe('MpecService', () => {
  let service: MpecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MpecService],
    }).compile();

    service = module.get<MpecService>(MpecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
