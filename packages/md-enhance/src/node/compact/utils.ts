import { chalk } from "@vuepress/utils";
import { logger } from "../utils.js";

export interface DeprecatedLoggerOptions {
  options: Record<string, unknown>;
  deprecatedOption: string;
  newOption: string;
  msg?: string;
  scope?: string;
}

export const deprecatedLogger = ({
  options,
  deprecatedOption,
  newOption,
  msg = "",
  scope = "",
}: DeprecatedLoggerOptions): void => {
  if (deprecatedOption in options) {
    logger.warn(
      `${chalk.magenta(deprecatedOption)} is ${chalk.yellow("deprecated")}${
        scope ? ` in ${scope}` : ""
      }, please use "${chalk.magenta(newOption)}" instead.${
        msg ? `\n${msg}` : ""
      }`
    );

    if (newOption.includes(".")) {
      const keys = newOption.split(".");
      let temp = options;

      keys.forEach((key, index) => {
        if (index !== keys.length - 1) {
          // ensure level exists
          temp[key] = temp[key] || {};

          temp = temp[key] as Record<string, unknown>;
        } else temp[key] = options[deprecatedOption];
      });
    } else options[newOption] = options[deprecatedOption];

    delete options[deprecatedOption];
  }
};

export const droppedLogger = (
  options: Record<string, unknown>,
  droppedOption: string,
  hint = "",
  newOption = ""
): void => {
  if (droppedOption in options) {
    logger.error(
      `"${chalk.magenta(droppedOption)}" is ${chalk.red("removed")}${
        newOption
          ? `, please use ${chalk.magenta(newOption)} instead.`
          : " and no longer supported"
      }${hint ? `\n${hint}` : ""}`
    );

    if (!newOption) delete options[droppedOption];
  }
};
