import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ClientTag extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public client_id: number

  @column()
  public tag_id: number
}
