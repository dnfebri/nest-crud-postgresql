import { IsNotEmpty } from 'class-validator';

export class CreateRewardCategoryDto {
  @IsNotEmpty()
  name: string;
}

export class RewardCategoryDtoById {
  @IsNotEmpty()
  id: string;
}
