import { ensureEndingSlash } from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { PWAOptions } from "../shared/index.js";

const __dirname = getDirname(import.meta.url);
const CLIENT_FOLDER = ensureEndingSlash(path.resolve(__dirname, "../client"));

export const prepareConfigFile = (
  app: App,
  options: PWAOptions
): Promise<string> => {
  let configImport = "";
  let rootComponents = "";

  if (options.showInstall) {
    configImport += `\
import PWAInstall from "${CLIENT_FOLDER}components/PWAInstall.js";
`;

    rootComponents += `\
PWAInstall,
`;
  }

  if (options.update === "hint") {
    configImport += `\
import SWHintPopup from "${
      options.hintComponent || `${CLIENT_FOLDER}components/SWHintPopup.js`
    }";
`;

    rootComponents += `\
SWHintPopup,
`;
  } else if (options.update !== "disable" && options.update !== "force") {
    configImport += `\
import SWUpdatePopup from "${
      options.updateComponent || `${CLIENT_FOLDER}components/SWUpdatePopup.js`
    }";
`;

    rootComponents += `\
SWUpdatePopup,
`;
  }

  return app.writeTemp(
    `pwa2/config.js`,
    `\
import { defineClientConfig } from "@vuepress/client";
import { setupPWA } from "${CLIENT_FOLDER}composables/setup.js";
${configImport}

export default defineClientConfig({
  setup: () => {
    setupPWA();
  },
  rootComponents: [
${rootComponents
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  ],
});
`
  );
};
