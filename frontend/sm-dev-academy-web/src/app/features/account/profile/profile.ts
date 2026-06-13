import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { PageContainer } from '../../../shared/ui/page-container/page-container';
import { forkJoin } from 'rxjs';
import { FavoriteService } from '../../../core/services/favorite-service/favorite.service';
import { MyCourseService } from '../../../core/services/my-course-service/my-course.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PageContainer, MatIconModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class Profile implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly myCourseService = inject(MyCourseService);
  private readonly cdr = inject(ChangeDetectorRef);

  user: any = null;

  myCoursesCount: number = 0;
  favoritesCount: number = 0;

  showPassword = false;
  passwordPreview = '********';

  ngOnInit(): void {
    this.user = this.authService.getUser();

    forkJoin({
      myCourses: this.myCourseService.getMyCourses(),

      favorites: this.favoriteService.getFavorites(),
    }).subscribe({
      next: (response) => {
        this.myCoursesCount = response.myCourses.length;

        this.favoritesCount = response.favorites.length;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  getInitial(): string {
    return (this.user?.name?.charAt(0) ?? 'U').toUpperCase();
  }

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (!this.user) {
        return;
      }

      this.user.avatarUrl = reader.result as string;

      localStorage.setItem('smda_user', JSON.stringify(this.user));
      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  editName(): void {
    const name = prompt('Novo nome:', this.user?.name);

    if (!name || name === this.user?.name) {
      return;
    }

    this.authService
      .updateProfile({
        name,
      })
      .subscribe({
        next: (response: any) => {
          this.user = response.user;

          localStorage.setItem('smda_user', JSON.stringify(response.user));
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  editEmail(): void {
    const email = prompt('Novo email:', this.user?.email);

    if (!email || email === this.user?.email) {
      return;
    }

    this.authService
      .updateProfile({
        email,
      })
      .subscribe({
        next: (response: any) => {
          this.user = response.user;

          localStorage.setItem('smda_user', JSON.stringify(response.user));
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(error);
        },
      });
  }

  changePassword(): void {
    const currentPassword = prompt('Senha atual:');

    if (!currentPassword) {
      return;
    }

    const newPassword = prompt('Nova senha:');

    if (!newPassword) {
      return;
    }

    this.authService
      .changePassword({
        currentPassword,
        newPassword,
      })
      .subscribe({
        next: () => {
          alert('Senha alterada com sucesso.');
          this.cdr.detectChanges();
        },

        error: (error) => {
          alert(error?.error?.message ?? 'Erro ao alterar senha.');
        },
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
