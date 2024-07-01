import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class executeCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsArray()
  @IsNotEmpty()
  TestCases: TestCase[];
}

export class TestCase {
  @IsString()
  input: string;

  @IsString()
  expectedOutput: string;
}
