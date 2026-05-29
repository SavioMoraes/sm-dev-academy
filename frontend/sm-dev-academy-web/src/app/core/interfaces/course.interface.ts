export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  playlistUrl: string;
  category: string;
  technology: string;
  language: string;
  legend: string | null;
  featured: boolean;
}

export interface CoursesResponse {
  total: number;
  courses: Course[];
}