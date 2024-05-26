import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { MarvelApiService } from '../../services/services/marvel-api.service';
import { CharacterDataWrapper } from 'src/app/services/models';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDialogComponent } from '../character-dialog/character-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  lastLoginDate: Date = new Date();
  characters: any[] = [];
  userName: string = '';
  offset: number = 0;
  limit: number = 20;
  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;

  constructor(
    private router: Router,
    private marvelApiService: MarvelApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token) as any;
      this.userName = decodedToken.name;
      console.log('userName:', this.userName);
      this.getCharacters();
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.getCharacters();
        }
      });
    });

    observer.observe(this.scrollAnchor.nativeElement);
  }


  getCharacters(): void {
    this.marvelApiService.getAllCharacters({ limit: this.limit, offset: this.offset }).subscribe({
      next: (response: CharacterDataWrapper) => {
        if (response.data && response.data.results) {
          this.characters.push(...response.data.results);
          this.offset += this.limit;
          console.log('Characters:', this.characters);
        }
      },
      error: (error) => {
        console.error('Error fetching characters:', error);
      }
    });
  }


  openCharacterDialog(character: any): void {
    this.dialog.open(CharacterDialogComponent, {
      data: character
    });
  }

  logout(): void {
    // Perform any needed logout logic here, like clearing tokens
    localStorage.removeItem('token'); // Remove token from local storage
    this.router.navigate(['/login']); // Navigate to login component
  }
}
