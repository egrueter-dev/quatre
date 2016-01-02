// Template Helpers, Events and Methods for:
//  - jobssearch template

if (Meteor.isClient) {
  Meteor.subscribe('jobs');
}

if (Meteor.isServer) {
  Meteor.methods({});
}

