// This TS version of the Task model shows how to create Realm objects using
// TypeScript syntax, using `@realm/babel-plugin`
// (https://github.com/realm/realm-js/blob/main/packages/babel-plugin/).
//
// If you are not using TypeScript and `@realm/babel-plugin`, you instead need
// to defining a schema on the class - see `Task.js` in the Realm example app
// for an example of this.

import Realm, { type ObjectSchema } from 'realm';

// To use a class as a Realm object type in Typescript with the `@realm/babel-plugin` plugin,
// simply define the properties on the class with the correct type and the plugin will convert
// it to a Realm schema automatically.
export default class TripDestination extends Realm.Object {
  name!: string;
  country?: string;
  lat?: Realm.Types.Float;
  long?: Realm.Types.Float;

  static schema: ObjectSchema = {
    name: 'TripDestination',
    embedded: true,
    properties: {
      name: 'string',
      country: 'string?',
      lat: 'float?',
      long: 'float?',
    },
  };
}
