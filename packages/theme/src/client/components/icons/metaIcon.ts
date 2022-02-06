import { IconBase } from "@mr-hope/vuepress-shared/lib/client";
import { h } from "vue";

import type { FunctionalComponent } from "vue";

export const EditIcon: FunctionalComponent = () =>
  h(IconBase, { name: "edit" }, () =>
    h("path", {
      d: "M117.953 696.992 64.306 959.696l265.931-49.336 450.204-452.505-212.284-213.376-450.204 452.513zm496.384-296.326L219.039 797.993l-46.108-46.34L568.233 354.33l46.104 46.335zm345.357-122.99-114.45 115.04-212.288-213.377 114.45-115.035 212.288 213.371zm0 0",
    })
  );

EditIcon.displayName = "EditIcon";