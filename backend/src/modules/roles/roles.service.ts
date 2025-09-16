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
      { name: 'admin', cyrillic: 'Администратор' },
      { name: 'user', cyrillic: 'Пользователь' },
      { name: 'news_author', cyrillic: 'Автор новостей' },
      { name: 'news_editor', cyrillic: 'Редактор новостей' },
      { name: 'streamer_bio_author', cyrillic: 'Автор карточек стримера' },
      { name: 'streamer_bio_editor', cyrillic: 'Редактор карточек стримера' },
    ]

    return manager.transaction(async (m: EntityManager) => {
      for (const role of rolesList) {
        const roleExists = await m.findOne(Role, { where: { name: role.name } })
        if (roleExists) {
          if (!roleExists.cyrillic || roleExists.cyrillic !== role.cyrillic) {
            roleExists.cyrillic = role.cyrillic
            await m.save(Role, roleExists)
            console.log(`Role ${role.name} updated!`)
          } else {
            console.log(`Role ${role.name} already up-to-date!`)
          }
        } else {
          await m.save(Role, { name: role.name, cyrillic: role.cyrillic })
          console.log(`Role ${role.name} created!`)
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
