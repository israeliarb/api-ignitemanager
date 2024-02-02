import Route from '@ioc:Adonis/Core/Route';

Route.post('/login', 'AuthController.login')
Route.post('logout', 'AuthController.logout')

Route.resource('user', 'UsersController').only([
  'index', 'store', 'update', 'show', 'destroy'
])

Route.resource('client', 'ClientsController').only([
  'index', 'store', 'update', 'show', 'destroy'
])
Route.get('/client/:id/client-tags', 'ClientsController.clientTags')

Route.resource('tag', 'TagsController').only([
  'index', 'store', 'update', 'show'
])

Route.resource('client-tag', 'ClientTagsController').only([
  'index', 'store', 'update', 'show', 'destroy'
])

Route.group(() => {
  Route.get('auth/me', 'AuthController.me')
}).middleware('auth')

Route.get("/", async () => {
  return {
    ignite: "manager",
  };
}
);

