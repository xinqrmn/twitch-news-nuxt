import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateStreamerDto {
  @IsString()
  username: string;

  @IsString()
  displayName: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsArray()
  @IsOptional()
  languages?: string[];
}

