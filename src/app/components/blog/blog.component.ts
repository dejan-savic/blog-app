import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Blog } from 'src/app/models/blog/blog';
import { ResponseGet } from 'src/app/models/response-base/response-base';
import { BlogService } from 'src/app/services/blog/blog.service';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  blogs: Array<Blog> = new Array<Blog>();
  getBlogSubscription!: Subscription;

  constructor(private blogService: BlogService, private eventEmitter: EventEmitterService) { }

  ngOnInit(): void {
    this.getAllBlogs();
  }

  ngOnDestroy(): void {
    this.getBlogSubscription.unsubscribe();
  }

  getAllBlogs() {
    this.getBlogSubscription = this.blogService.getAllBlogPosts().subscribe((data: ResponseGet) => {
      this.blogs = data.resultData;
      this.blogs.forEach(b => {
        b.createdAt = new Date(b.createdAt)
      })
      console.log(this.blogs);
      
    });
  }

}
