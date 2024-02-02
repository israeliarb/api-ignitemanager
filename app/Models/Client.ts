import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ClientTag from './ClientTag'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public created_by: number

  @column()
  public last_update_by: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ClientTag, {
    foreignKey: 'client_id',
    localKey: 'id'
  })
  public clientTags: HasMany<typeof ClientTag>
}
