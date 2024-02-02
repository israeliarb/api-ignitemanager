import Route from '@ioc:Adonis/Core/Route';

Route.post('/login', 'AuthController.login')
Route.post('logout', 'AuthController.logout')

Route.resource('user', 'UsersController')

Route.resource('client', 'ClientsController')

Route.resource('tag', 'TagsController')

Route.group(() => {
  Route.get('auth/me', 'AuthController.me')
}).middleware('auth')

Route.get("/", async () =>{
    return {
      ignite: "manager",
    };
  }
);

