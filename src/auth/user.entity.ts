import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email'])
@Unique(['nickname'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email' })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ name: 'nickname' })
  nickname: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdDate: Date;

  @CreateDateColumn({
    name: 'updated_at',
  })
  updatedDate: Date;
}
