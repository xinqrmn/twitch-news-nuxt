import { Injectable, OnModuleInit } from '@nestjs/common'
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { Role } from './roles.entity'
import { DataSource, EntityManager, Not, Repository } from 'typeorm'

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(
    @InjectDataSource()
    private readonly connection: DataSource,
    @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {}

  async onModuleInit(manager: EntityManager = this.connection.manager) {
    const rolesList = [
      'admin',
      'user',
      'news_author',
      'news_editor',
      'streamer_bio_author',
      'streamer_bio_editor',
    ]

    return manager.transaction(async (m: EntityManager) => {
      for (const role of rolesList) {
        const roleExists = await m.findOne(Role, { where: { name: role } })
        if (roleExists) console.log(`Role ${role} already exists!`)
        else {
          await m.save(Role, { name: role })
          console.log(`Role ${role} created!`)
        }
      }
    })
  }

  async getAllRoles(): Promise<Role[]> {
    const roles = await this.roleRepo.findBy({
      name: Not('admin'),
    })

    return roles
  }
}
