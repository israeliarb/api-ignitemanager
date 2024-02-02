import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await User.create({
      name: 'User',
      email: 'user@email.com',
      password: '123456',
      type: 'user'
    })
  }
}
