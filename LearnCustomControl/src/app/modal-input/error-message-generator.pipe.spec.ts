import { ErrorMessageGeneratorPipe } from './error-message-generator.pipe';

describe('ErrorMessageGeneratorPipe', () => {
  it('create an instance', () => {
    const pipe = new ErrorMessageGeneratorPipe();
    expect(pipe).toBeTruthy();
  });
});
