import { create, test, enforce } from "vest";

export const validator = create((controls = {}) => {
  test('addressee', 'Name is required', () => {
    enforce(controls.addressee).isNotEmpty();
  });

  test('addressee', 'Name is longer than 50 characters ', () => {
    enforce(controls.addressee.length).lessThanOrEquals(50);
  });

  test('street1', 'Address 1 is required', () => {
    enforce(controls.street1).isNotEmpty();
  });

  test('street1', 'Address 1 is longer than 50 characters ', () => {
    enforce(controls.street1.length).lessThanOrEquals(50);
  });

  test('street2', 'Address 2 is longer than 50 characters ', () => {
    enforce(controls.street2.length).lessThanOrEquals(50);
  });

  test('town', 'Town is required', () => {
    enforce(controls.town).isNotEmpty();
  });

  test('town', 'Town is longer than 50 characters ', () => {
    enforce(controls.town.length).lessThanOrEquals(50);
  });

  test('postcode', 'Postcode is required', () => {
    enforce(controls.postcode).isNotEmpty();
  });

  test('postcode', 'Postcode is less than 5 characters ', () => {
    enforce(controls.postcode.length).greaterThan(4);
  });

  test('postcode', 'Postcode is longer than 8 characters ', () => {
    enforce(controls.postcode.length).lessThan(9);
  });
});
