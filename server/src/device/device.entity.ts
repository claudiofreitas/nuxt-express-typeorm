import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class Device {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public device: string

  @Column()
  public os: string

  @Column()
  public manufacturer: string

  @Column()
  public lastCheckedOutDate: string

  @Column()
  public lastCheckedOutBy: string

  @Column()
  public isCheckedOut: boolean
}

export default Device
