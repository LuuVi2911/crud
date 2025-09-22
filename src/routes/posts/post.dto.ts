import { Type } from 'class-transformer'
import { IsString } from 'class-validator'
import { UserModel } from 'src/shared/model/user.model'
import { PostModel } from 'src/shared/model/post.model'

export class GetPostItemDTO extends PostModel {
  @Type(() => UserModel)
  author: Omit<UserModel, 'password'>

  constructor(partial: Partial<GetPostItemDTO>) {
    super(partial)
    Object.assign(this, partial)
  }
}

export class CreatePostBodyDTO {
  @IsString()
  title: string
  @IsString()
  content: string
}

export class UpdatePostBodyDTO extends CreatePostBodyDTO {}
