import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('email', 255).notNullable().unique()
      table.integer('created_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      table.integer('last_update_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
