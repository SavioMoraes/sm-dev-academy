import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {

  async importCourses() {

    return {
      found: 0,
      accepted: 0,
      saved: 0,
      duplicates: 0,
    };

  }

}