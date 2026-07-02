import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth-service/auth.service';
import { PageContainer } from '../../../shared/ui/page-container/page-container';
import { FormsModule } from '@angular/forms';
import { TECHNOLOGIES } from '../../../core/constants/technologies';
import { Technology } from '../../../core/interfaces/technology.interface';
import { Course } from '../../../core/interfaces/course.interface';
import { CourseService } from '../../../core/services/course-service/course.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PageContainer, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  @ViewChild('selectedUserCard')
  selectedUserCard!: ElementRef<HTMLDivElement>;

  @ViewChild('courseSearchInput')
  private readonly courseSearchInput!: ElementRef<HTMLInputElement>;

  @ViewChild('userSearchInput')
  private readonly userSearchInput!: ElementRef<HTMLInputElement>;

  private readonly API_URL = environment.apiUrl;

  isLoading = false;

  technologies = Object.values(TECHNOLOGIES).flat() as Technology[];
  selectedTechnologies: string[] = [];

  courseSearch = '';
  courseResults: Course[] = [];
  selectedCourse: Course | null = null;
  isCourseDropdownOpen = false;

  userSearch = '';
  userResults: any[] = [];
  selectedUser: any = null;
  isUserDropdownOpen = false;

  importResult: any = null;

  dashboard: {
    totalCourses: number;
    totalUsers: number;
    totalAdmins: number;
    totalStartedCourses: number;
  } | null = null;

  users: any[] = [];
  playlistIdToDelete = '';
  isDeletingCourse = false;

  resetPasswordModalOpen = false;
  selectedUserId = '';
  newPassword = '';
  confirmPassword = '';
  passwordError = '';

  selectedUserCourses: any[] = [];
  coursesModalOpen = false;
  userModalOpen = false;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly courseService: CourseService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadDashboard().subscribe({
      next: (response) => {
        this.dashboard = response;
        this.cdr.detectChanges();
      },
    });
    this.loadUsers();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // CURSOS
    if (!target.closest('.admin-course-search')) {
      this.closeCourseSearch();
    }

    // USUÁRIOS
    if (!target.closest('.admin-user-search')) {
      this.userSearch = '';
      this.userResults = [];
      this.isUserDropdownOpen = false;
    }

    this.cdr.detectChanges();
  }

  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent): void {
  //   const target = event.target as HTMLElement;

  //   if (target.closest('.admin-user-search')) {
  //     return;
  //   }

  //   this.userSearch = '';
  //   this.userResults = [];
  //   this.isUserDropdownOpen = false;

  //   this.cdr.detectChanges();
  // }

  loadDashboard() {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<{
      totalCourses: number;
      totalUsers: number;
      totalAdmins: number;
      totalStartedCourses: number;
    }>(`${this.API_URL}/admin/dashboard`, {
      headers,
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
          this.selectedUser.role = 'ADMIN';
          this.cdr.detectChanges();
          this.loadUsers();
          this.loadDashboard();
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
          this.selectedUser.role = 'USER';
          this.cdr.detectChanges();
          this.loadUsers();
          this.loadDashboard();
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
          this.closeUserModal();
          this.closeCoursesModal();
          this.selectedUser = null;

          alert('Usuário excluído com sucesso.');

          this.loadUsers();

          this.loadDashboard().subscribe({
            next: (dashboard) => {
              this.dashboard = dashboard;
              this.cdr.detectChanges();
            },
          });
        },
      });
  }

  toggleTechnologyByLabel(label: string): void {
    if (!label) {
      return;
    }

    if (this.selectedTechnologies.includes(label)) {
      return;
    }

    if (this.selectedTechnologies.length >= 4) {
      alert('Selecione no máximo 4 tecnologias.');

      return;
    }

    this.selectedTechnologies.push(label);

    this.cdr.detectChanges();
  }

  removeTechnology(label: string): void {
    this.selectedTechnologies = this.selectedTechnologies.filter(
      (technology) => technology !== label,
    );

    this.cdr.detectChanges();
  }

  onCourseSearch(): void {
    const term = this.courseSearch.trim();

    if (term.length < 3) {
      this.courseResults = [];
      this.isCourseDropdownOpen = false;
      this.cdr.detectChanges();
      return;
    }

    this.courseService.searchCourses(term).subscribe({
      next: (courses) => {
        this.courseResults = courses;
        this.isCourseDropdownOpen = true;
        this.cdr.detectChanges();
      },
    });
  }

  selectCourse(course: Course): void {
    this.selectedCourse = course;
    this.playlistIdToDelete = course.playlistId;
    this.courseSearch = course.title;
    this.courseResults = [];
    this.isCourseDropdownOpen = false;
    this.cdr.detectChanges();
  }

  onUserSearch(): void {
    const term = this.userSearch.trim();

    if (!term.length) {
      this.userResults = [...this.users];
      this.isUserDropdownOpen = true;
      this.cdr.detectChanges();

      return;
    }

    if (term.length < 3) {
      return;
    }

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any[]>(`${this.API_URL}/admin/users/search?term=${term}`, {
        headers,
      })
      .subscribe({
        next: (users) => {
          this.userResults = users;
          this.isUserDropdownOpen = true;
          this.cdr.detectChanges();
        },
      });
  }

  openUsersDropdown(): void {
    if (this.userSearch.trim().length >= 3) {
      this.onUserSearch();

      return;
    }

    this.userResults = [...this.users];
    this.isUserDropdownOpen = true;

    this.cdr.detectChanges();
  }

  showAllUsers(): void {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any[]>(`${this.API_URL}/admin/users`, {
        headers,
      })
      .subscribe({
        next: (users) => {
          this.userResults = users;
          this.userModalOpen = true;

          this.cdr.detectChanges();
        },
      });
  }

  selectUser(user: any): void {
    this.selectedUser = user;
    this.userSearch = '';
    this.userResults = [];
    this.isUserDropdownOpen = false;

    this.cdr.detectChanges();

    queueMicrotask(() => {
      this.selectedUserCard?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  clearSelectedUser(): void {
    this.selectedUser = null;
    this.userSearch = '';
    this.userResults = [];
    this.isUserDropdownOpen = false;
    this.cdr.detectChanges();
  }

  closeCourseSearch(): void {
    if (this.selectedCourse) {
      this.courseSearch = this.selectedCourse.title;
    } else {
      this.courseSearch = '';
    }

    this.courseResults = [];
    this.isCourseDropdownOpen = false;
    this.cdr.detectChanges();
  }

  importCourses(): void {
    if (!this.selectedTechnologies.length) {
      alert('Selecione pelo menos uma tecnologia.');

      return;
    }

    this.isLoading = true;
    this.importResult = null;

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .post(
        `${this.API_URL}/admin/courses/import`,
        {
          technologies: this.selectedTechnologies,
        },
        {
          headers,
        },
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;

          this.importResult = response;

          this.loadDashboard().subscribe({
            next: (dashboard) => {
              this.dashboard = dashboard;
              this.cdr.detectChanges();
            },
          });

          window.dispatchEvent(new CustomEvent('notifications-updated'));
        },

        error: (error) => {
          console.error(error);

          this.importResult = {
            error: true,
            message: error?.error?.message ?? 'Erro ao importar cursos.',
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
          this.courseSearch = '';
          this.selectedCourse = null;
          this.courseResults = [];
          this.isCourseDropdownOpen = false;
          this.isDeletingCourse = false;
          this.loadDashboard();
          this.cdr.detectChanges();

          window.dispatchEvent(new CustomEvent('notifications-updated'));
        },
        error: () => {
          this.isDeletingCourse = false;
        },
      });
  }

  openResetPasswordModal(userId: string): void {
    this.selectedUserId = userId;
    this.newPassword = '';
    this.confirmPassword = '';
    this.resetPasswordModalOpen = true;
  }

  resetPassword(): void {
    this.passwordError = '';

    if (!this.newPassword.trim()) {
      this.passwordError = 'Informe uma nova senha.';
      return;
    }

    if (this.newPassword.length < 6) {
      this.passwordError = 'A senha deve possuir pelo menos 6 caracteres.';
      return;
    }

    if (!this.confirmPassword.trim()) {
      this.passwordError = 'Confirme a senha.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'As senhas não coincidem.';
      return;
    }

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .patch(
        `${this.API_URL}/admin/users/${this.selectedUserId}/reset-password`,
        {
          password: this.newPassword,
        },
        {
          headers,
        },
      )
      .subscribe({
        next: () => {
          this.resetPasswordModalOpen = false;
          this.selectedUserId = '';
          this.newPassword = '';
          this.confirmPassword = '';
          this.passwordError = '';
          this.cdr.detectChanges();

          alert('Senha alterada com sucesso.');
        },

        error: (error) => {
          console.error(error);
          this.passwordError = error?.error?.message || 'Erro ao alterar senha.';
          this.cdr.detectChanges();
        },
      });
  }

  closeResetPasswordModal(): void {
    this.resetPasswordModalOpen = false;
    this.selectedUserId = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordError = '';
  }

  openCoursesModal(userCourses: any[]): void {
    this.selectedUserCourses = userCourses;
    this.coursesModalOpen = true;
  }

  closeCoursesModal(): void {
    this.coursesModalOpen = false;
    this.selectedUserCourses = [];
  }

  openUserModal(user: any): void {
    this.selectedUser = user;
    this.userModalOpen = true;
  }

  closeUserModal(): void {
    this.userModalOpen = false;
  }
}
