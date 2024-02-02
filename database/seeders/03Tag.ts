import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Tag from 'App/Models/Tag'

export default class TagSeeder extends BaseSeeder {
  public async run () {
    await Tag.create({
      name: 'Cliente',
    })
  }
}
