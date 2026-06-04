export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  playlistUrl: string;
  playlistId: string;
  category: string;
  technology: string;
  featured: boolean;
}

export interface CoursesResponse {
  total: number;
  courses: Course[];
}