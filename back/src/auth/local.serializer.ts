import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/Users';
import { AuthService } from './auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    super();
  }

  serializeUser(user: Users, done: CallableFunction) {
    //로그인 시도시 실행
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    //페이지 방문시마다 실행
    return await this.usersRepository
      .findOneOrFail({
        where: { id: +userId },
        select: ['id', 'email', 'nickname'],
      })
      .then((user) => {
        console.log('user', user);
        done(null, user);
      })
      .catch((error) => done(error));
  }
}