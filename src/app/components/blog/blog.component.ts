import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, take } from 'rxjs/operators';
import { Blog } from 'src/app/models/blog/blog';
import { ResponseGet } from 'src/app/models/response-base/response-base';
import { BlogService } from 'src/app/services/blog/blog.service';
import { EventEmitterService } from 'src/app/services/event-emitter/event-emitter.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {

  blogs: Array<Blog> = new Array<Blog>();
  getBlogSubscription!: Subscription;
  createBlogSub!: Subscription;
  updateBlogSub!: Subscription;
  deleteBlogSub!: Subscription;
  searchBlogSub!: Subscription;

  constructor(private blogService: BlogService, private eventEmitter: EventEmitterService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.getAllBlogs();
    this.searchBlogsEventSubscribe();
  }

  ngOnDestroy(): void {
    this.getBlogSubscription.unsubscribe();
    this.searchBlogSub.unsubscribe();
  }

  getAllBlogs() {
    this.getBlogSubscription = this.blogService.getAllBlogPosts().subscribe((data: ResponseGet) => {
      if (data) {
        this.blogs = data.resultData;
      }
    });
  }

  searchBlogsEventSubscribe() {
    this.eventEmitter.searchEvent.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(term => term.length > 0),
    ).subscribe(searchTerm => {
      searchTerm = searchTerm.length === 0 ? '' : searchTerm;
      this.searchBogs(searchTerm);
    });
  }

  searchBogs(searchTerm: string) {
    this.searchBlogSub = this.blogService.searchBlogPost(searchTerm).subscribe(data => {
      if (data) {
        this.blogs = data.resultData;
      }
    })
  }

  openEditBlogDialog(blog: Blog = new Blog()) {
    this.modalService.editBlogDialogOpen({ blog: blog });
    this.modalService.editBlogDialogConfirmed().subscribe((data: Blog) => {
      if (data !== null) {
        this.saveBlogPost(data);
      }
    })
  }

  saveBlogPost(blog: Blog) {
    if (blog.id === 0) {
      this.createBlogPost(blog);
    } else {
      this.updateBlogPost(blog);
    }
  }

  createBlogPost(blog: Blog) {
    this.createBlogSub = this.blogService.createBlogPost(blog).subscribe(data => {
      if (data) {
        this.eventEmitter.notificationEvent.emit('Blog Post Created Sucessfully');
        this.getAllBlogs();
        this.createBlogSub.unsubscribe();
      }
    });
  }

  updateBlogPost(blog: Blog) {
    this.updateBlogSub = this.blogService.updateBlogPost(blog).subscribe(data => {
      if (data || data === null) {
        this.eventEmitter.notificationEvent.emit('Blog Post Updated Sucessfully');
        this.getAllBlogs();
        this.updateBlogSub.unsubscribe();
      }
    })
  }

  openConfirmDialog(id: number) {
    this.modalService.confirmDialogOpen({
      title: 'Delete Blog Post',
      message: 'Are you sure?',
      cancelText: 'Cancel',
      confirmText: 'Yes'
    });
    this.modalService.confirmDialogConfirmed().subscribe(data => {
      if (data === true) {
        this.deleteBlogPost(id);
      }
    });
  }

  deleteBlogPost(id: number) {
    this.deleteBlogSub = this.blogService.deleteBlogPost(id).subscribe(data => {
      console.log(data);
      if (data || data === null) {
        this.eventEmitter.notificationEvent.emit('Blog Post Deleted Sucessfully');
        this.getAllBlogs();
        this.deleteBlogSub.unsubscribe();
      }
    })
  }

}
