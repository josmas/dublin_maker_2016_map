# Dublin Maker 2016 Map
This is a simple map that shows a number of landmarks in Merrion Square, and a
number of activities during Dublin Maker 2016, on July 23rd.

It is part of the App Inventor tent, and we will be making apps that send
location data to this map to be rendered.

>> note: This is not production-ready code (not even near). It is a hack developed over a few days.

## Contributing

Want to help? We love new contributors! Please review our [contributing guidelines](CONTRIBUTING.md).

### Getting Started
Simply fork/clone and npm install. `npm start` should do the rest.

### Testing
Note that the system uses RethinkDB for storage. The integration tests run against
a real DB, so an instance has to be available. `npm test` runs all tets.

Run `node createDB.js` to create the DB and table that the tests expect.


Jos, July 2016
