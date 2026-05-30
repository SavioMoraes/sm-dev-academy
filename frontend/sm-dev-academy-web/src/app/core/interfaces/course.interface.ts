export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  playlistUrl: string;
  category: string;
  technology: string;
  language: string;
  featured: boolean;
}

export interface CoursesResponse {
  total: number;
  courses: Course[];
}