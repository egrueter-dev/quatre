jobs = new Mongo.Collection('jobs');

if (Meteor.isClient) {
  Meteor.subscribe('jobs')
}

if (Meteor.isServer) {
  Meteor.publish('jobs');
}
