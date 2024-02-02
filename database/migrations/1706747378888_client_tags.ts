import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'client_tags'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
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
      table.primary(['client_id', 'tag_id'])
    });
  };

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
