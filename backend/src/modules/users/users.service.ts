import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, EntityManager, Repository, In } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { User } from './users.entity'
import { Role } from '../roles/roles.entity'
import * as bcrypt from 'bcrypt'
import { Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { userRegisterDto } from './dto/user-register.dto'
import { userRegisterWithRolesDto } from './dto/user-register-with-roles.dto'
import { userUpdateDto } from './dto/user-update.dto'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectDataSource()
    private readonly connection: DataSource,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {}

  async onModuleInit() {
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
        image_url: 'https://www.meme-arsenal.com/memes/f8f6e7873be56ba281665a5a5bb838c4.jpg',
        roles: [role!],
      })
      console.log('Admin user created: admin@cms.com / admin123')
    } else console.log('Admin already exists!')
  }

  async findByEmail(email: string) {
    return this.connection.manager.findOne(User, { where: { email, del: 0 } })
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
        image_url: dto.image_url ?? null,
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
        if (roleName.toLowerCase() === 'admin')
          throw new HttpException(
            'Нельзя создать пользователя с ролью "Администратор"!',
            HttpStatus.FORBIDDEN
          )
        const role = await m.findOne(Role, { where: { name: roleName.toLowerCase() } })
        if (!role) {
          throw new HttpException('Роль не найдена!', HttpStatus.NOT_FOUND)
          // role = await m.save(Role, { name: roleName })
        }
        roles.push(role)
      }

      const user = m.create(User, {
        email: dto.email,
        username: dto.username,
        password_hash: passwordHash,
        image_url: dto.image_url ?? null,
        roles,
      })

      await m.save(User, user)

      return
    })
  }

  async getUserById(userId: number): Promise<{
    id: number
    username: string
    email: string
    image_url: string | null
    created_at: Date
    updated_at: Date
    roles: { name: string; cyrillic: string }[]
  }> {
    const user = await this.userRepo.findOne({
      relations: ['roles'],
      select: ['id', 'email', 'username', 'image_url', 'created_at', 'updated_at'],
      where: { id: userId, del: 0 },
    })

    if (!user) throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      image_url: user.image_url ?? null,
      created_at: user.created_at,
      updated_at: user.updated_at,
      roles: user.roles
        ? user.roles.map((role: { name: string; cyrillic: string }) => ({
            name: role.name,
            cyrillic: role.cyrillic,
          }))
        : [],
    }
  }

  async getUserProfileByUsername(username: string): Promise<object> {
    const user = await this.userRepo.findOne({
      relations: ['roles'],
      select: ['id', 'username', 'image_url', 'created_at'],
      where: { username: username, del: 0 },
    })

    if (!user) throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    return {
      id: user.id,
      username: user.username,
      image_url: user.image_url ?? null,
      roles: user.roles
        ? user.roles.map((role: { name: string; cyrillic: string }) => ({
            name: role.name,
            cyrillic: role.cyrillic,
          }))
        : [],
    }
  }

  async getAllUsers(query: PaginateQuery): Promise<Paginated<User>> {
    const paginated = await paginate(query, this.userRepo, {
      relations: ['roles'],
      select: ['id', 'email', 'username', 'image_url', 'roles.*', 'created_at', 'updated_at'],
      where: { del: 0 },
      sortableColumns: ['id', 'email', 'username', 'created_at', 'updated_at'],
      searchableColumns: ['id', 'email', 'username', 'created_at', 'updated_at'],
      filterableColumns: {
        email: [],
        username: [],
      },
    })
    return paginated
  }

  async softDeleteUserById(
    userIdToDelete: number,
    requestingUser: { id: number; roles?: string[] },
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const isAdmin = (requestingUser.roles ?? []).includes('admin')
      const isSelf = requestingUser.id === userIdToDelete

      if (!(!isAdmin || !isSelf)) {
        throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN)
      }

      const user = await m.findOne(User, { where: { id: userIdToDelete } })
      if (!user) {
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
      }

      if (user.del === 1) {
        return
      }

      const updatePayload: QueryDeepPartialEntity<User> = { del: 1 }
      await m.update(User, { id: userIdToDelete }, updatePayload)

      return
    })
  }

  async editUserById(
    dto: userUpdateDto,
    userId: number,
    requestingUser: { id: number; roles?: string[] },
    manager: EntityManager = this.connection.manager
  ): Promise<void> {
    return manager.transaction(async (m: EntityManager) => {
      const isAdmin = (requestingUser.roles ?? []).includes('admin')
      const isSelf = requestingUser.id === userId

      if (!(isAdmin || isSelf)) {
        throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN)
      }

      const user = await m.findOne(User, { where: { id: userId } })
      if (!user) {
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
      }

      if (user.del === 1) {
        return
      }

      const updatePayload: QueryDeepPartialEntity<User> = {}
      if (dto.email !== undefined) updatePayload.email = dto.email
      if ((dto.password as string) !== undefined) {
        updatePayload.password_hash = await bcrypt.hash(dto.password, 10)
      }
      if (dto.image_url !== undefined) {
        updatePayload.image_url = dto.image_url
      }

      let rolesToAssign: Role[] = []
      if (dto.roles !== undefined) {
        if (!isAdmin) {
          throw new HttpException('Недостаточно прав для изменения ролей', HttpStatus.FORBIDDEN)
        }

        const normalizedRoleNames = (dto.roles ?? []).map((r) => r.toLowerCase())
        if (normalizedRoleNames.includes('admin')) {
          throw new HttpException('Нельзя назначить роль "Администратор"!', HttpStatus.FORBIDDEN)
        }

        rolesToAssign = await m.find(Role, { where: { name: In(normalizedRoleNames) } })
        if (rolesToAssign.length !== normalizedRoleNames.length) {
          throw new HttpException('Роль не найдена!', HttpStatus.NOT_FOUND)
        }
        console.info(rolesToAssign.length)
      }

      if (Object.keys(updatePayload).length > 0) {
        await m.update(User, { id: userId }, updatePayload)
      }

      if (rolesToAssign.length) {
        await m
          .createQueryBuilder()
          .relation(User, 'roles')
          .of(userId)
          .addAndRemove(rolesToAssign, user.roles ?? [])
      }

      return
    })
  }
}
