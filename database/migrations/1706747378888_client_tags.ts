import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'client_tags'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
      .integer('client_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('clients')
      table
      .integer('tag_id')
      .unsigned()
      .notNullable()
      .references('id').inTable('tags')
    });
  };

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
