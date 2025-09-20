import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PostsService } from 'src/routes/posts/posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getPosts() {
    return this.postsService.getPosts()
  }

  @Get(':id')
  getPostById(@Param('id') id: number) {
    return this.postsService.getPostById(Number(id))
  }

  @Post()
  createPost(@Body() body: any) {
    return this.postsService.createPost(body)
  }

  @Put(':id')
  updatePost(@Param('id') id: number, @Body() body: any) {
    return this.postsService.updatePost(Number(id), body)
  }
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id))
  }
}
