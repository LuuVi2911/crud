import { Injectable } from '@nestjs/common'
import envConfig from 'src/shared/config'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  getPosts() {
    return this.prismaService.post.findMany()
  }

  getPostById(id: number) {
    return this.prismaService.post.findUnique({
      where: { id },
    })
  }

  createPost(body: any) {
    const userId = 1
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    })
  }

  // Update an existing post
  updatePost(id: number, body: any) {
    return this.prismaService.post.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
      },
    })
  }
  deletePost(id: number) {
    return this.prismaService.post.delete({
      where: { id },
    })
  }
}
