import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import type { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request | undefined): string | null => {
          if (!req) return null
          const cookies: Partial<Record<string, string>> | undefined = (
            req as unknown as {
              cookies?: Partial<Record<string, string>>
            }
          ).cookies
          const token = cookies?.access_token
          return typeof token === 'string' ? token : null
        },
      ]),
      secretOrKey: process.env.JWT_SECRET_KEY as string,
    })
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: { email: string; roles: string[] }) {
    return { email: payload.email, roles: payload.roles }
  }
}