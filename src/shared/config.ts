import { plainToInstance } from 'class-transformer'
import { isString, IsString, validateSync } from 'class-validator'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({
  path: '.env',
})

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('.env not found')
  process.exit(1)
}

class ConfigSchema {
  @IsString()
  DATABASE_URL: string
  @IsString()
  ACCESS_TOKEN_SECRET: string
  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string
  @IsString()
  REFRESH_TOKEN_SECRET: string
  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string
  @IsString()
  SECRET_API_KEY: string
}
const configServer = plainToInstance(ConfigSchema, process.env)
const errorArray = validateSync(configServer)

if (errorArray.length > 0) {
  console.log('The value in .env are not valid')
  const errors = errorArray.map((eItem) => {
    return {
      property: eItem.property,
      constraints: eItem.constraints,
      value: eItem.value,
    }
  })
  throw errors
}
const envConfig = configServer

export default envConfig
