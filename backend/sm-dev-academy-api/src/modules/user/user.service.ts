import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UserService {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async findByEmail(
    email: string,
  ) {

    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

  }

  async create(
    data: {
      name: string;
      email: string;
      password: string;
      role?: string;
    },
  ) {

    return this.prismaService.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role ?? 'USER',
      },
    });

  }

}