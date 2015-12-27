betaUsers = new Mongo.Collection('beta-users');

if (Meteor.isClient) {
  Meteor.subscribe('beta-users')

  Template.landing.helpers({
  });

  Template.landing.events({
    'submit form': function(event){
      event.preventDefault();
      var email = event.target.email.value
      Meteor.call('createBetaUser', email);
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('beta-users');

  Meteor.methods({
    'createBetaUser': function(email){
      betaUsers.insert({email: email});
    }
  })

  Meteor.startup(function () {
    // code to run on server at startup
  });
}

// Todo:
  // Routes for navigation
  // Routes and form capture for landing page
  // Login/Logout

  // Layout file with navigation
//
// Navigation:
  // Dashboard home
  // Inbox
  // Messages
  // Jobs
  // Teams
