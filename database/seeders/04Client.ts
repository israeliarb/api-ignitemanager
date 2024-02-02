import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'
import User from 'App/Models/User'

export default class ClientSeeder extends BaseSeeder {
  public async run () {
    const user =  await User.first()

    await Client.create({
      name: 'Client',
      email: 'client@email.com',
      created_by: user?.id,
      last_update_by: user?.id
    })
  }
}
