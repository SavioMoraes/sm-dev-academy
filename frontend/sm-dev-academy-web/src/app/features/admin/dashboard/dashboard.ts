import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { PageContainer } from '../../../shared/ui/page-container/page-container';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PageContainer, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly API_URL = environment.apiUrl;

  isLoading = false;
  importResult: any = null;

  dashboard: {
    totalCourses: number;
    totalUsers: number;
    totalAdmins: number;
  } | null = null;

  users: any[] = [];
  playlistIdToDelete = '';
  isDeletingCourse = false;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadUsers();
  }

  loadDashboard(): void {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<{
        totalCourses: number;
        totalUsers: number;
        totalAdmins: number;
      }>(`${this.API_URL}/admin/dashboard`, {
        headers,
      })
      .subscribe({
        next: (response) => {
          this.dashboard = response;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  loadUsers(): void {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any[]>(`${this.API_URL}/admin/users`, {
        headers,
      })
      .subscribe({
        next: (response) => {
          this.users = response;

          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  promoteUser(userId: string): void {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .patch(
        `${this.API_URL}/admin/users/${userId}/promote`,
        {},
        {
          headers,
        },
      )
      .subscribe({
        next: () => {
          alert('Usuário promovido para administrador.');
          setTimeout(() => {
            this.loadUsers();
            this.loadDashboard();
            this.cdr.detectChanges();
          }, 300);
        },
      });
  }

  demoteUser(userId: string): void {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .patch(
        `${this.API_URL}/admin/users/${userId}/demote`,
        {},
        {
          headers,
        },
      )
      .subscribe({
        next: () => {
          alert('Administrador removido com sucesso.');
          setTimeout(() => {
            this.loadUsers();
            this.loadDashboard();
            this.cdr.detectChanges();
          }, 300);
        },
      });
  }

  deleteUser(userId: string): void {
    const confirmed = confirm('Deseja excluir este usuário?');

    if (!confirmed) {
      return;
    }

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .delete(`${this.API_URL}/admin/users/${userId}`, {
        headers,
      })
      .subscribe({
        next: () => {
          alert('Usuário excluído com sucesso.');
          setTimeout(() => {
            this.loadUsers();
            this.loadDashboard();
            this.cdr.detectChanges();
          }, 300);
        },
      });
  }

  importCourses(): void {
    this.isLoading = true;
    this.importResult = null;

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .post(
        `${this.API_URL}/admin/courses/import`,
        {},
        {
          headers,
        },
      )
      .subscribe({
        next: (response) => {
          this.importResult = response;
          this.loadDashboard();
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);

          this.importResult = {
            error: true,
            message: error?.error?.message || 'Erro ao sincronizar cursos.',
          };

          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
  }

  deleteCourse(): void {
    if (!this.playlistIdToDelete.trim()) {
      return;
    }

    const confirmed = confirm('Deseja excluir este curso?');

    if (!confirmed) {
      return;
    }

    this.isDeletingCourse = true;

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .delete(`${this.API_URL}/admin/courses/playlist/${this.playlistIdToDelete}`, {
        headers,
      })
      .subscribe({
        next: () => {
          alert('Curso excluído com sucesso.');
          this.playlistIdToDelete = '';
          this.isDeletingCourse = false;
          this.loadDashboard();
          this.cdr.detectChanges();
        },
        error: () => {
          this.isDeletingCourse = false;
        },
      });
  }
}
