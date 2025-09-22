import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { REQUEST_USER_KEY } from 'src/shared/constants/auth.constant'
import { TokenPayLoad } from 'src/shared/types/jwt.type'

export const ActiveUser = createParamDecorator((field: keyof TokenPayLoad | undefined, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  const user: TokenPayLoad | undefined = request[REQUEST_USER_KEY]
  return field ? user?.[field] : user
})
