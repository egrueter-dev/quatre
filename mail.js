jobs = new Mongo.Collection('mail');

if (Meteor.isClient) {
  Meteor.subscribe('mail')
}

if (Meteor.isServer) {
  Meteor.publish('mail');
}
