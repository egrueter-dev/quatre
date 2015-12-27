Router.configure({
  layoutTemplate: 'main'
});

var onBeforeAction = function(){
  var currentUser = Meteor.userId();
  if(currentUser){
    this.next();
  } else {
    this.render('/login');
  }
}

// This could probably be dried up
Router.route('/dashboard', {onBeforeAction});
Router.route('/inbox', {onBeforeAction});
Router.route('/jobs', {onBeforeAction});
Router.route('/teams', {onBeforeAction});
Router.route('/messages', {onBeforeAction});

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

