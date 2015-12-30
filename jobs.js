jobs = new Mongo.Collection('jobs');

if (Meteor.isClient) {
  Meteor.subscribe('jobs')

  // Helpers - get user's jobs..
  // Template.job.helpers({
  // });

  // NewJob events
  Template.newjob.events({
    'submit form': function(event){
      event.preventDefault();
      var title = $('[name=title]').val();
      var salary = $('[name=salary]').val();
      var location = $('[name=location]').val();
      var description = $('[name=description]').val();

      Meteor.call('createJob', title, salary, location, description)
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('jobs');

  Meteor.methods({
    'createJob': function(title, salary, location, description){
      jobs.insert({
        title: title,
        salary: salary,
        location: location,
        description: description,
        user_id: this.userId
      });
    },
  });
}
