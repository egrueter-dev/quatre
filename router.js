Router.configure({
 layoutTemplate: 'main'
});

Router.route('/dashboard');

Router.route('/', {
  name: 'landing',
  template: 'landing'
});

Router.route('/login');
Router.route('/inbox');
Router.route('/jobs');
Router.route('/teams');
Router.route('/messages');

