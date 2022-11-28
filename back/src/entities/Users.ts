import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Comments } from './Comments';
import { Posts } from './Posts';
import { ApiProperty } from '@nestjs/swagger';


@Index('email', ['email'], { unique: true })
@Entity('users', { schema: 'react_nodebird' })
export class Users {
  @ApiProperty({
    example:1,
    description:"Users 아이디"
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    example:"1234@1234.com",
    description:"이메일"
  })
  @Column('varchar', { name: 'email', unique: true, length: 40 })
  email: string;

  @ApiProperty({
    example:"넷반",
    description:"닉네임"
  })
  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @ApiProperty({
    example:"1q2w3e4r!@",
    description:"비밀번호"
  })
  @Column('varchar', { name: 'password', nullable: true, length: 140 })
  password: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example:"24213412",
    description:"SNS아이디"
  })
  @Column('varchar', { name: 'snsId', nullable: true, length: 45 })
  snsId: string | null;

  @ApiProperty({
    example:"24213412.png",
    description:"프로필 사진"
  })
  @Column('varchar', { name: 'profile', nullable: true, length: 200 })
  profile: string | null;

  //이하 관계설정

  @OneToMany(() => Posts, (posts) => posts.User)
  Posts: Posts[];

  @OneToMany(() => Comments, (comments) => comments.User)
  Comments: Comments[];

  @ManyToMany(() => Users, (users) => users.Following)
  Follows: Users[];

  @JoinTable({
    name: 'follow',
    joinColumn: {
      name: 'FollwingId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'FollwerId',
      referencedColumnName: 'id',
    },
  })
  @ManyToMany(() => Users, (users) => users.Follows)
  Following: Users[];

  @ManyToMany(() => Posts, (posts) => posts.Likes)
  Likes: Posts[];
}
