import { FinMoneyPipe } from './fin-money.pipe';

describe('FinMoneyPipe', () => {
  it('create an instance', () => {
    const pipe = new FinMoneyPipe();
    expect(pipe).toBeTruthy();
  });
});
