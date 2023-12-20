import { registerAs } from '@nestjs/config';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { AppConfig } from 'src/types/config/config.type';
import validateConfig from './validate-config';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  // @IsUrl({ require_tld: false })
  // @IsOptional()
  // FRONTEND_DOMAIN: string;

  // @IsUrl({ require_tld: false })
  // @IsOptional()
  // BACKEND_DOMAIN: string;

  // @IsString()
  // @IsOptional()
  // API_PREFIX: string;

  // @IsString()
  // @IsOptional()
  // APP_FALLBACK_LANGUAGE: string;

  // @IsString()
  // @IsOptional()
  // APP_HEADER_LANGUAGE: string;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'app',
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
      ? parseInt(process.env.PORT, 10)
      : 9000,
  };
});
