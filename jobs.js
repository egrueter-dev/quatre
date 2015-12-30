Jobs = new Mongo.Collection('jobs');

if (Meteor.isClient) {
  Meteor.subscribe('jobs')

  Template.jobs.helpers({
    'jobs': function(){
      var userId = Meteor.user()._id
      return Jobs.find().fetch();
    }
  });

  // Job specific events
  Template.job.events({
    'click .deleteJob': function(){
      Meteor.call('deleteJob', this._id);
      // Flash confirmation message..
    }
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
        user_id: this.userId
      });
    },
    'deleteJob': function(jobId){
      Jobs.remove(jobId);
    }
  });
}

// 'click .removePlayer': function(){
// var selectedPlayer = Session.get('selectedPlayer');
// Meteor.call('removePlayerData', selectedPlayer);
// },

// 'removePlayerData': function(selectedPlayer) {
// PlayersList.remove(selectedPlayer);
// },
