import { IsBoolean, IsString } from 'class-validator'

class CreateDeviceDto {
  @IsString()
  public device: string

  @IsString()
  public os: string

  @IsString()
  public manufacturer: string

  @IsString()
  public lastCheckedOutDate: string

  @IsString()
  public lastCheckedOutBy: string

  @IsBoolean()
  public isCheckedOut: boolean
}

export default CreateDeviceDto
