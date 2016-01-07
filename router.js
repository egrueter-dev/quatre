Router.configure({
  layoutTemplate: 'main',
  loadingTemplate: 'loading'
});

var onBeforeAction = function(){
  var currentUser = Meteor.userId();
  if(currentUser){
    this.next();
  } else {
    this.render('/login');
  }
}

// This could probably be DRY'ed up

Router.route('/dashboard', {onBeforeAction});
Router.route('/inbox', {onBeforeAction});
Router.route('/jobs', {onBeforeAction});
Router.route('/teams', {onBeforeAction});
Router.route('/messages', {onBeforeAction});
Router.route('/profile', {onBeforeAction});

Router.route('/jobsearch', {
  onBeforeAction,
  layoutTemplate: 'jobsearch',
});

// This route needs to be refactored

Router.route('/jobs/:_id', {
  onBeforeAction,
  name: 'job.show',
  data: function(){
    var currentJob = this.params._id;
    var response = Jobs.findOne({ _id: currentJob });
    console.log(response);
    return response
  }
});

// The below should not conform to the 'main' template.
Router.route('/', {
  name: 'landing',
  layoutTemplate: 'landing',
  template: 'landing'
});

Router.route('/login', {
  layoutTemplate: 'login'
});

Router.route('/register', {
  layoutTemplate: 'register'
});

