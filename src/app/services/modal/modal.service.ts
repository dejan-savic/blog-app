import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/modals/confirm-dialog/confirm-dialog.component';
import { EditBlogDialogComponent } from 'src/app/modals/edit-blog/edit-blog-dialog.component';
import { Blog } from 'src/app/models/blog/blog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private confirmDialog!: MatDialogRef<ConfirmDialogComponent>;
  private editBlogDialog!: MatDialogRef<EditBlogDialogComponent>

  constructor(private dialog: MatDialog) { }

  public confirmDialogOpen(options: { title: string, message: string, cancelText: string, confirmText: string }) {
    this.confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    });
  }

  public confirmDialogConfirmed(): Observable<any> {
    let result: any = null;
    if (this.confirmDialog) {
      return this.confirmDialog.afterClosed().pipe(take(1), map(res => {
        result = res;
        return result;
      }));
    } else {
      return result;
    }
  }

  public editBlogDialogOpen(options: { blog: Blog }) {
    this.editBlogDialog = this.dialog.open(EditBlogDialogComponent, {
      data: {
        blog: options.blog
      },
      width: '40vw',
      panelClass: 'custom-dialog-container'
    })
  }

  public editBlogDialogConfirmed(): Observable<any> {
    return this.editBlogDialog.afterClosed().pipe(take(1), map(res => {
      return res;
    }))
  }


}
