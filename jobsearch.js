// Template Helpers, Events and Methods for:
//  - jobssearch template

if (Meteor.isClient) {
  Meteor.subscribe('jobs');

  // A rough fuzzy search..
  Template.jobsearch.helpers({
    'jobs': function(){
     var regexp = new RegExp(Session.get('search/keyword'), 'i');
     return Jobs.find({title: regexp}).fetch();
    }
  });

  Template.jobsearch.events({
    'keyup .jobsearch': function(event){
      Session.set('search/keyword', event.target.value);
      console.log(Session.get('search/keyword'));
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
  });
}

