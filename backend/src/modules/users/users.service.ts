import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './users.entity'
import { Role } from '../roles/roles.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {
  }

  async onModuleInit() {
    const adminRole = await this.roleRepo.findOne({ where: { name: 'admin' } })
    if (!adminRole) {
      await this.roleRepo.save({name: 'admin'})
    }

    const adminUser = await this.userRepo.findOne({ where: { email: 'admin@cms.com' } })
    if (!adminUser) {
      const passwordHash = await bcrypt.hash('admin123', 10)
      const role = await this.roleRepo.findOne({ where: { name: 'admin' } })
      await this.userRepo.save({
        email: 'admin@cms.com',
        password: passwordHash,
        roles: [role!]
      })
      console.log('Admin user created: admin@cms.com / admin123')
    }
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } })
  }
}