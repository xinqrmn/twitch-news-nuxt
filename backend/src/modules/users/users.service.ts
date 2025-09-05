import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, Repository } from 'typeorm'
import { User } from './users.entity'
import { Role } from '../roles/roles.entity'
import * as bcrypt from 'bcrypt'
import { userRegisterDto } from './dto/user-register.dto'
import { userRegisterWithRolesDto } from './dto/user-register-with-roles.dto'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectDataSource()
    private readonly connection: DataSource,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {}

  async onModuleInit() {
    const adminRole = await this.connection.manager.findOne(Role, { where: { name: 'admin' } })
    if (!adminRole) {
      await this.connection.manager.save(Role, { name: 'admin' })
    }

    const adminUser = await this.connection.manager.findOne(User, {
      where: { email: 'admin@cms.com' },
    })
    if (!adminUser) {
      const passwordHash = await bcrypt.hash('admin123', 10)
      const role = await this.connection.manager.findOne(Role, { where: { name: 'admin' } })
      await this.connection.manager.save(User, {
        email: 'admin@cms.com',
        username: 'admin',
        password_hash: passwordHash,
        roles: [role!],
      })
      console.log('Admin user created: admin@cms.com / admin123')
    }
  }

  async findByEmail(email: string) {
    return this.connection.manager.findOne(User, { where: { email } })
  }

  async createUser(
    dto: userRegisterDto,
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const userExists = await m.findOne(User, {
        where: [{ username: dto.username }, { email: dto.email }],
      })

      if (userExists) {
        throw new HttpException('Пользователь уже существует!', HttpStatus.FORBIDDEN)
      }

      const passwordHash = await bcrypt.hash(dto.password, 10)

      let userRole = await m.findOne(Role, { where: { name: 'user' } })
      if (!userRole) {
        userRole = await m.save(Role, { name: 'user' })
      }

      const user = m.create(User, {
        email: dto.email,
        username: dto.username,
        password_hash: passwordHash,
        roles: [userRole],
      })

      await m.save(User, user)

      return
    })
  }

  async createUserWithRoles(
    dto: userRegisterWithRolesDto,
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const userExists = await m.findOne(User, {
        where: [{ username: dto.username }, { email: dto.email }],
      })

      if (userExists) {
        throw new HttpException('Пользователь уже существует!', HttpStatus.FORBIDDEN)
      }

      const passwordHash = await bcrypt.hash(dto.password, 10)

      const roles: Role[] = []
      for (const roleName of dto.roles) {
        let role = await m.findOne(Role, { where: { name: roleName } })
        if (!role) {
          role = await m.save(Role, { name: roleName })
        }
        roles.push(role)
      }

      const user = m.create(User, {
        email: dto.email,
        username: dto.username,
        password_hash: passwordHash,
        roles,
      })

      await m.save(User, user)

      return
    })
  }
}
