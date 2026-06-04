export interface CourseVideo {
  id: string;
  courseId: string;
  videoId: string;
  title: string;
  thumbnail: string;
  position: number;
}

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

  videos: CourseVideo[];
}

export interface CoursesResponse {
  total: number;
  courses: Course[];
}

export type CourseResponse = Course;