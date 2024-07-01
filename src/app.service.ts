import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { TestCase } from './exec.dto';

const execAsync = promisify(exec);

@Injectable()
export class AppService {
  private createTempFile(content: string, extension: string): string {
    const tempFileName = `script.${extension}`;
    const tempFilePath = path.join(__dirname, tempFileName);
    fs.writeFileSync(tempFilePath, content);
    return tempFilePath;
  }

  private createTempInputFile(content: string): string {
    const tempFileName = 'input.txt';
    const tempFilePath = path.join(__dirname, tempFileName);
    fs.writeFileSync(tempFilePath, content);
    return tempFilePath;
  }

  getHello(): string {
    return 'Hello World!';
  }

  async executeCode(code: string, testCases: TestCase[]): Promise<any> {
    console.log(process.env.LANGUAGE);
    if (process.env.LANGUAGE) {
      console.error('Language not set');
      process.exit(1);
    }

    console.log(process.env.EXEC_COMMAND);
    if (process.env.EXEC_COMMAND) {
      console.error('Execution command not set');
      process.exit(1);
    }
    const startTime = process.hrtime();
    const startMemory = process.memoryUsage().heapUsed;

    let result;
    let tempScriptFilePath;
    let tempInputFilePath;
    let extension = process.env.LANGUAGE;
    let execCommand = process.env.EXEC_COMMAND;

    tempScriptFilePath = this.createTempFile(code, extension);

    const results = [];

    for (const testCase of testCases) {
      tempInputFilePath = this.createTempInputFile(testCase.input);
      console.log('tempInputFilePath', tempInputFilePath);
      try {
        console.log(
          'command executed' +
            `${execCommand} ${tempScriptFilePath} < ${tempInputFilePath}`,
        );

        let output = await execAsync(
          `${execCommand} ${tempScriptFilePath} < ${tempInputFilePath}`,
        );

        console.log(output);

        results.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: output.stdout,
          passed: output.stdout === testCase.expectedOutput,
        });
      } catch (error) {
        results.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: error.stderr || error.message,
          passed: false,
        });
      } finally {
        if (tempInputFilePath) {
          fs.unlinkSync(tempInputFilePath);
        }
      }
    }

    if (tempScriptFilePath) {
      fs.unlinkSync(tempScriptFilePath);
    }

    const endTime = process.hrtime(startTime);
    const endMemory = process.memoryUsage().heapUsed;
    const timeTaken = endTime[0] * 1000 + endTime[1] / 1e6;
    const memoryUsed = (endMemory - startMemory) / 1024 / 1024;

    return {
      timeTaken: `${timeTaken.toFixed(3)} ms`,
      memoryUsed: `${memoryUsed.toFixed(3)} MB`,
      results,
    };
  }
}
