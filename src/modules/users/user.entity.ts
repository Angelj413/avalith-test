import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity({ name: 'users' })
@Index(['id'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, length: 100, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 11, nullable: true })
  ssn: string;

  @Column({ type: 'timestamptz', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
