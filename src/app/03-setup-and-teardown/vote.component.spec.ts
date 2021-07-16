import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  let component: VoteComponent;
  beforeEach(() => {
    component = new VoteComponent();
  });

  it('should increment totalVotes when up voted', () => {
    component.upVote();

    expect(component.totalVotes).toBe(1);
  });

  it('should decrement totalVotes when down voted', () => {
    component.downVote();

    expect(component.totalVotes).toBe(-1);
  });
});
