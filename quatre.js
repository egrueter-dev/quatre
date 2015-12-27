betaUsers = new Mongo.Collection('beta-users');

if (Meteor.isClient) {
  Meteor.subscribe('beta-users')

  Template.landing.helpers({

  });

  // Template Events - separate into standalone files

  Template.main.events({
   'click .logout': function(event){
     event.preventDefault();
     Meteor.logout();
     Router.go('/landing')
   }
  });

  Template.login.events({
    'submit form': function(event){
      event.preventDefault();
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();

      Meteor.loginWithPassword(email, password, function(error){
        if(error){
          console.log(error.reason);
        } else {
          Router.go('/dashboard');
        }
      });
    }
  });

  Template.register.events({
    'submit form': function(event){
      event.preventDefault();
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();

      Accounts.createUser({email: email, password: password}, function(error){
        if(error) {
          console.log(error.reason);
        } else {
          Router.go('/dashboard');
        }
      });
    }
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
    },
    'userCreate': function(email, password){
      // Accounts.createUser provided by accounts-password
      Accounts.createUser({email: email, password: password});

      console.log(response);
    },
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
