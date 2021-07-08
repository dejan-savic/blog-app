import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blog/blog';
import { ResponseGet } from 'src/app/models/response-base/response-base';
import { HttpHelperService } from '../http-helper/http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  controller = 'BlogPosts'

  constructor(private httpHelper: HttpHelperService) { }

  getAllBlogPosts(): Observable<ResponseGet> {
    return this.httpHelper.get(this.controller);
  }

  getBlogPostById(blogId: number): Observable<ResponseGet> {
    return this.httpHelper.get(this.controller + `/${blogId}`);
   }

  getBlogPostsByCategory(categoryId: number): Observable<ResponseGet> {
    return this.httpHelper.get(this.controller + `/${categoryId}`);
   }

  searchBlogPost(term: string): Observable<ResponseGet> {
    const params = new HttpParams().append('term', term);
    return this.httpHelper.get(this.controller + '/Search', params);
   }

  createBlogPost(blog: Blog): Observable<Blog> {
    return this.httpHelper.post(this.controller, blog);
   }

  updateBlogPost(blog: Blog): Observable<any> {
    return this.httpHelper.put(this.controller + `/${blog.id}`, blog);
   }

  deleteBlogPost(blogId: number): Observable<any> {
    return this.httpHelper.delete(this.controller + `/${blogId}`);
   }


}
