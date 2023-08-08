import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'PUBLIC';
export const IsPublic = () => SetMetadata(IS_PUBLIC, true);
