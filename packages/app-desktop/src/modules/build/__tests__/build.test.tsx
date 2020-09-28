import { Build } from '../mod';

describe('build', () => {
  it('should create a new virtual character', () => {
    const vc1 = Build.create();
    const vc2 = Build.create();

    expect(vc1).not.toBe(vc2);
  });
});
