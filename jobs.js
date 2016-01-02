Jobs = new Mongo.Collection('jobs');

// Template Helpers, Events and Methods for:
//  - jobs template
//  - job  template
//  - newjob template
//  - jobShow template

if (Meteor.isClient) {
  Meteor.subscribe('jobs')

  // Helpers
  Template.jobs.helpers({
    'jobs': function(){
      var userId = Meteor.user()._id
      return Jobs.find().fetch();
    }
  });

  // Events
  Template.job.events({
    'click .deleteJob': function(){
      Meteor.call('deleteJob', this._id);
      // Flash confirmation message..
    },
    'click .label': function(){
      Meteor.call('updateActivity', this._id, this.active);
    }
  });

  Template.jobShow.events({
    'keyup [name=title]': function(event){
      if(event.which == 13 || event.which == 27) {
        $(event.target).blur();
      } else {
        var title = $(event.target).val();
        var jobId = this._id
        Meteor.call('updateJobTitle', jobId, title);
      }
    },
    'keyup [name=salary]': function(event){
      if(event.which == 13 || event.which == 27) {
        $(event.target).blur();
      } else {
        var salary = $(event.target).val();
        var jobId = this._id
        Meteor.call('updateJobSalary', jobId, salary);
      }
    },
    'keyup [name=location]': function(event){
      if(event.which == 13 || event.which == 27) {
        $(event.target).blur();
      } else {
        var location = $(event.target).val();
        var jobId = this._id
        Meteor.call('updateJobLocation', jobId, location);
      }
    },
    'keyup [name=description]': function(event){
      if(event.which == 13 || event.which == 27) {
        $(event.target).blur();
      } else {
        var description = $(event.target).val();
        var jobId = this._id
        Meteor.call('updateJobDescription', jobId, description);
      }
    },
  });

  Template.newjob.events({
    // If user jobs > 2 prevent the addition of more
    // Jobs untill payment is successfull
    // Throw up a modal with current payment information,
    // Then allow payment for additional jobs to happen

    'submit form': function(event){
      event.preventDefault();
      var title = $('[name=title]').val();
      var salary = $('[name=salary]').val();
      var location = $('[name=location]').val();
      var description = $('[name=description]').val();
      Meteor.call('createJob', title, salary, location, description)

      // Clear form and redirect!
      event.target.text.value = "";
      // Flash confirmation message..
      // https://atmospherejs.com/mrt/flash-messages
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('jobs', function(){
    var currentUser = this.userId;
    return Jobs.find({user_id: currentUser });
  });

  Meteor.methods({
    'createJob': function(title, salary, location, description){
      Jobs.insert({
        title: title,
        salary: salary,
        location: location,
        description: description,
        user_id: this.userId,
        active: true
      });
    },
    'deleteJob': function(jobId){
      Jobs.remove(jobId);
    },
    'updateActivity': function(jobId, active){
      if(active){
        Jobs.update({_id: jobId}, {$set: { active: false}});
      } else {
        Jobs.update({_id: jobId}, {$set: { active: true }});
      }
    },
    'updateJobTitle': function(jobId, title){
      Jobs.update({ _id: jobId }, {$set: { title: title }});
    },
    'updateJobSalary': function(jobId, salary){
      Jobs.update({ _id: jobId }, {$set: { salary: salary }});
    },
    'updateJobLocation': function(jobId, location){
      Jobs.update({ _id: jobId }, {$set: { location: location }});
    },
    'updateJobDescription': function(jobId, description){
      Jobs.update({ _id: jobId }, {$set: { description: description }});
    }
  });
}

