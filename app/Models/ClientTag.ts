import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ClientTag extends BaseModel {
  @column({ isPrimary: true })
  public client_id: number

  @column({ isPrimary: true })
  public tag_id: number
}
