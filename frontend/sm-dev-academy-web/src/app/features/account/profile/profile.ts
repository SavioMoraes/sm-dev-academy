import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { PageContainer } from '../../../shared/ui/page-container/page-container';
import { forkJoin } from 'rxjs';
import { FavoriteService } from '../../../core/services/favorite-service/favorite.service';
import { MyCourseService } from '../../../core/services/my-course-service/my-course.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PageContainer],
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

  hasUnsavedChanges = false;
  editedName = '';
  editedEmail = '';
  editedPassword = '';
  editedAvatarUrl = '';

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.editedName = this.user?.name ?? '';
    this.editedEmail = this.user?.email ?? '';
    this.editedAvatarUrl = this.user?.avatarUrl ?? '';

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

      this.editedAvatarUrl = reader.result as string;

      this.user = {
        ...this.user,
        avatarUrl: this.editedAvatarUrl,
      };

      this.hasUnsavedChanges = true;

      this.cdr.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  editName(): void {
    const name = prompt('Novo nome:', this.editedName);

    if (!name) {
      return;
    }

    this.editedName = name;
    this.user.name = name;
    this.hasUnsavedChanges = true;
    this.cdr.detectChanges();
  }

  editEmail(): void {
    const email = prompt('Novo email:', this.editedEmail);

    if (!email) {
      return;
    }

    this.editedEmail = email;
    this.user.email = email;
    this.hasUnsavedChanges = true;
    this.cdr.detectChanges();
  }

  changePassword(): void {
    const password = prompt('Nova senha:');

    if (!password) {
      return;
    }

    this.editedPassword = password;
    this.hasUnsavedChanges = true;

    alert('Nova senha definida. Clique em Salvar Alterações para confirmar.');
  }

  saveChanges(): void {
    const confirmed = confirm('Deseja salvar as alterações?');

    if (!confirmed) {
      return;
    }

    this.authService
      .updateProfile({
        name: this.editedName,
        email: this.editedEmail,
        avatarUrl: this.editedAvatarUrl,
        password: this.editedPassword,
      })
      .subscribe({
        next: (response: any) => {
          this.user = response.user;

          this.authService.setAuth(this.authService.getToken()!, response.user);

          this.hasUnsavedChanges = false;
          this.editedPassword = '';

          alert('Alterações salvas com sucesso.');

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(error);

          alert(error?.error?.message ?? 'Erro ao salvar alterações.');
        },
      });
  }

  canDeactivate(): boolean {
    if (!this.hasUnsavedChanges) {
      return true;
    }

    const wantsToLeave = confirm('Você possui alterações não salvas. Deseja sair?');

    if (!wantsToLeave) {
      return false;
    }

    return confirm('Você perderá todas as alterações. Deseja continuar?');
  }
}
