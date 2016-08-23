import { expect } from 'chai';

describe('sample test', () => {
  it('should do basic arithmetic', () => {
    expect(1 + 1).to.equal(2);
  });

  it('should understand the object spread operator', () => {
    let a = {key: 'old'};
    let b = {...a, key: 'new'};

    expect(a.key).to.equal('old');
    expect(b.key).to.equal('new');
  });
});
