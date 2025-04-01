import { Component, Input, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-rating-list',
  imports: [],
  templateUrl: './rating-list.component.html',
  styleUrl: './rating-list.component.css'
})

export class RatingListComponent implements OnInit {
  @Input() userId: string = '';  
  ratings: any[] = [];  
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 0;
  pages: number[] = [];

  constructor(
    private ratingService: RatingService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadRatings();
  }

  loadRatings(): void {
    this.ratingService.getRatings(this.userId,this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (data) => {
          this.ratings = data.ratings;
          this.totalItems = data.totalRatings;
          this.totalPages = data.totalPages;
          this.generatePageNumbers();
        },
        error: (error) => {
          console.error('Error cargando las valoraciones:', error);
        }
      });
  }

  generatePageNumbers(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadRatings();
  }

  deleteRating(ratingId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Estás seguro de eliminar la valoración?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ratingService.deleteRating(ratingId).subscribe({
          next: () => {
            this.loadRatings();
          },
          error: (error) => {
            console.error('Error al eliminar la valoración:', error);
          }
        });
      }
    });
  }
}





