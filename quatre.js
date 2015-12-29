betaUsers = new Mongo.Collection('beta-users');

if (Meteor.isClient) {
  Meteor.subscribe('beta-users')

  Template.landing.helpers({
  });

  Template.main.helpers({
    'username': function(){
      // This should be a default only if a full name is not avail
      return Meteor.user().emails[0].address
    }
  });

  Template.profile.helpers({
    'email': function(){
      // This should be a default only if a name is not avail
      return Meteor.user().emails[0].address
    },
    'username': function(){
      return Meteor.user().username
    },
    'company': function(){
      return Meteor.user().profile.company
    }
  });


  //Validations:

  Template.login.onRendered(function(){
    $('.login').validate();
  });

  Template.register.onRendered(function(){
    $('.register').validate();
  });

  // Template Events - separate into standalone files

  Template.profile.events({
    'keyup [name=username]': function(event){
      if(event.which == 13 || event.which == 27) {
        $(event.target).blur();
      } else {
        var username = $(event.target).val();
        var id = Meteor.user()._id
        Meteor.call('updateUserName', username, id);
      }
    },
    'keyup [name=company]': function(event){
      if(event.which == 13 || event.which == 27) {
        $(event.target).blur();
      } else {
        var companyName = $(event.target).val();
        var id = Meteor.user()._id
        Meteor.call('updateCompanyName', companyName, id);
      }
    }
  });

  Template.main.events({
    'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('/landing')
    },
    'click .profile':function(event){
      event.preventDefault();
      Router.go('/profile')
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
    },
    'updateUserName': function(userName, id){
      Meteor.users.update({_id: id}, {$set: {username: userName}});
    },
    'updateCompanyName': function(companyName, id){
      Meteor.users.update({_id: id}, {$set:{"profile.company": companyName}})
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

