import {greet} from "./greet";

describe('GreetComponent', () => {
  it('should include name in the message', () => {
    expect(greet('bilal')).toContain('bilal');
  });
});
