import { Car } from '../models/car';

describe('Car', () => {
  it('should create an instance', () => {
    expect(new Car(1,'qdqsdazd','qsdqsdqsd',200,12000)).toBeTruthy();
  });
});
