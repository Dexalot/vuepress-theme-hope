import { existsSync, writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import inquirer from "inquirer";

import { version } from "./config/index.js";
import { deepAssign } from "./utils/index.js";

import type { CreateI18n } from "./config/index.js";

const getScript = (dir: string): Record<string, string> => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:build": `vuepress build ${dir}`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:clean-dev": `vuepress dev ${dir} --clean-cache`,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "docs:dev": `vuepress dev ${dir}`,
});

export const createPackageJson = async (
  message: CreateI18n,
  source: string,
  cwd = process.cwd()
): Promise<void> => {
  /**
   * generate package.json
   */

  const packageJsonPath = resolve(cwd, "package.json");
  const scripts = getScript(source);
  const devDependencies = {
    "@vuepress/client": "2.0.0-beta.53",
    vue: "^3.2.43",
    vuepress: "2.0.0-beta.53",
    "vuepress-theme-hope": version,
  };

  if (existsSync(packageJsonPath)) {
    console.log(message.flow.updatePackage);

    // eslint-disable-next-line
    const packageContent: any = JSON.parse(
      readFileSync(packageJsonPath, { encoding: "utf-8" })
    );

    deepAssign(packageContent, { scripts, devDependencies });

    writeFileSync(
      packageJsonPath,
      `${JSON.stringify(packageContent, null, 2)}\n`,
      { encoding: "utf-8" }
    );
  } else {
    console.log(message.flow.createPackage);

    interface PackageJsonAnswer {
      name: string;
      version: string;
      description: string;
      license: string;
    }

    const result = await inquirer.prompt<PackageJsonAnswer>([
      {
        name: "name",
        type: "input",
        message: message.question.name,
        default: "vuepress-theme-hope-template",
        validate: (input: string): true | string =>
          /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/u.exec(
            input
          )
            ? true
            : message.error.name,
      },
      {
        name: "version",
        type: "input",
        message: message.question.version,
        default: "2.0.0",
        validate: (input: string): true | string =>
          /^[0-9]+\.[0-9]+\.(?:[0=9]+|[0-9]+-[a-z]+\.[0-9])$/u.exec(input)
            ? true
            : message.error.version,
      },
      {
        name: "description",
        type: "input",
        message: message.question.description,
        default: "A project of vuepress-theme-hope",
      },
      {
        name: "license",
        type: "input",
        message: message.question.license,
        default: "MIT",
      },
    ]);

    const packageContent = {
      ...result,
      type: "module",
      scripts,
      devDependencies,
    };

    writeFileSync(
      packageJsonPath,
      `${JSON.stringify(packageContent, null, 2)}\n`,
      { encoding: "utf-8" }
    );
  }
};
