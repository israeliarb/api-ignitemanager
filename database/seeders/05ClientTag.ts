import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'
import ClientTag from 'App/Models/ClientTag'
import Tag from 'App/Models/Tag'

export default class ClientTagSeeder extends BaseSeeder {
  public async run () {
    const client = await Client.first()
    const tag = await Tag.first()
    await ClientTag.create({
      client_id: client?.id,
      tag_id: tag?.id
    })
  }
}
