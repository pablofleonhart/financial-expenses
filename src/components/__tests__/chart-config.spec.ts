import { describe, expect, it } from 'vitest';
import { data, options } from '../analyzes/chart-config';

describe('Test data object', () => {
  it('has 4 labels', () => {
    expect(data.labels).to.have.lengthOf(4);
  });

  it('has 1 data set', () => {
    expect(data.datasets).to.have.lengthOf(1);
  });

  it('has the correct background colors', () => {
    expect(data.datasets[0].backgroundColor).to.have.members([
      '#41B883',
      '#E46651',
      '#00D8FF',
      '#DD1B16',
    ]);
  });

  it('has the correct data values', () => {
    expect(data.datasets[0].data).to.have.members([40, 20, 80, 10]);
  });

  describe('Test Options object', () => {
    it('has options', () => {
      expect(options).to.be.an('object');
    });

    it('has "responsive" prop set to true', () => {
      expect(options.responsive).to.be.true;
    });

    it('has "maintainAspectRatio" prop set to false', () => {
      expect(options.maintainAspectRatio).to.be.false;
    });
  });
});
