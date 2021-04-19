import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/interfaces/admin.interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  arrcategory: Array<ICategory> = [];
  categoryName: string;
  addstatus: boolean = true;
  savestatus: boolean = false;
  saveId: string | number;
  deleteId: string | number;
  searchCat: any;
  constructor(private AdminService: AdminService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.AdminService.getCategory().subscribe(
      data => {
        this.arrcategory = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  addCategory(): void {
    const CAT: ICategory = {
      name: this.categoryName,
    }
    this.AdminService.addCategory(CAT).subscribe(
      () => {
        this.getCategory();
      },
      error => {
        console.log(error);
      }
    );
    this.categoryName = '';
    this.addstatus = true;
  }

  addvalueChanged(event) {
    if (!event.target.value) {
      this.addstatus = true;
    }
    else {
      this.addstatus = false;
    }
  }

  editvalueChanged(event) {
    if (!event.target.value) {
      this.savestatus = true;
    }
    else {
      this.savestatus = false;
    }
  }

  resetValue() {
    this.categoryName = '';
    this.addstatus = true;
    this.savestatus = false;
  }

  deleteCategory(index: number | string): void {
    this.deleteId = index;
  }

  confirmDeleteCategory(): void {
    this.AdminService.deleteCategory(this.deleteId).subscribe(
      () => {
        this.getCategory();
      },
      error => {
        console.log(error);
      }
    )
  }

  editCategory(category: ICategory): void {
    this.categoryName = category.name;
    this.saveId = category.id;
  }

  updateCategory(): void {
    const editCat: ICategory = {
      name: this.categoryName,
      id: this.saveId
    }
    this.AdminService.updateCategory(editCat).subscribe(
      () => {
        this.getCategory();
      },
      error => {
        console.log(error);
      }
    )
  }
}
