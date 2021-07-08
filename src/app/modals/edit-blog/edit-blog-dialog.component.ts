import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Blog } from 'src/app/models/blog/blog';

@Component({
  selector: 'app-edit-blog-dialog',
  templateUrl: './edit-blog-dialog.component.html',
  styleUrls: ['./edit-blog-dialog.component.scss']
})
export class EditBlogDialogComponent implements OnInit {
  @ViewChild('editBlogForm') editBlogForm!: NgForm;
  blog: Blog = new Blog()

  constructor(@Inject(MAT_DIALOG_DATA) public data: { blog: Blog }, private matDialogRef: MatDialogRef<EditBlogDialogComponent>) { }

  ngOnInit(): void {
    if (this.data.blog.id > 0) {
      this.blog = { ... this.data.blog };
    }
  }

  private close(value: any) {
    this.matDialogRef.close(value);
  }

  public cancel() {
    this.close(null);
  }

  public confirm(ngForm: NgForm) {
    if (ngForm.form.valid) {
      this.matDialogRef.close(this.blog);
    }
  }

  @HostListener('keydown.esc')
  public onEsc() {
    this.cancel();
  }

}
