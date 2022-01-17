import { computed, defineComponent, h, toRef } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useSiteData } from "@vuepress/client";
import { ExternalLinkIcon } from "@vuepress/plugin-external-link-icon/lib/client";
import { useIconPrefix } from "@mr-hope/vuepress-shared/lib/client";
import { isLinkHttp, isLinkMailto, isLinkTel } from "@vuepress/shared";

import type { PropType, VNode } from "vue";
import type { AutoLink } from "../../shared";

export default defineComponent({
  name: "AutoLink",

  inheritAttrs: false,

  props: {
    item: {
      type: Object as PropType<AutoLink>,
      required: true,
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["focusout"],

  setup(props, { attrs, emit, slots }) {
    const route = useRoute();
    const site = useSiteData();
    const iconPrefix = useIconPrefix();

    const item = toRef(props, "item");

    // if the link has http protocol
    const hasHttpProtocol = computed(() => isLinkHttp(item.value.link));

    // if the link has non-http protocol
    const hasNonHttpProtocal = computed(
      () => isLinkMailto(item.value.link) || isLinkTel(item.value.link)
    );

    // resolve the `target` attr
    const linkTarget = computed(() =>
      hasNonHttpProtocal.value
        ? undefined
        : item.value.target
        ? item.value.target
        : hasHttpProtocol.value
        ? "_blank"
        : undefined
    );

    // if the `target` attr is '_blank'
    const isBlankTarget = computed(() => linkTarget.value === "_blank");

    // render `<RouterLink>` or not
    const renderRouterLink = computed(
      () =>
        !hasHttpProtocol.value &&
        !hasNonHttpProtocal.value &&
        !isBlankTarget.value
    );

    // resolve the `rel` attr
    const anchorRel = computed(() =>
      hasNonHttpProtocal.value
        ? undefined
        : item.value.rel
        ? item.value.rel
        : isBlankTarget.value
        ? "noopener noreferrer"
        : undefined
    );

    // resolve the `aria-label` attr
    const linkAriaLabel = computed(
      () => item.value.ariaLabel || item.value.text
    );

    // should be active when current route is a subpath of this link
    const shouldBeActiveInSubpath = computed(() => {
      // should not be active in `exact` mode
      if (props.exact) return false;

      const localeKeys = Object.keys(site.value.locales);

      // check all the locales
      if (localeKeys.length)
        return !localeKeys.some((key) => key === item.value.link);

      // check root
      return item.value.link !== "/";
    });

    // if this link is active
    const isActive = computed(() =>
      !renderRouterLink.value
        ? false
        : item.value.activeMatch
        ? new RegExp(item.value.activeMatch).test(route.path)
        : // if this link is active in subpath
        !shouldBeActiveInSubpath.value
        ? false
        : route.path.startsWith(item.value.link)
    );

    const renderIcon = (item: AutoLink): VNode | null =>
      item.icon
        ? h("i", {
            class: `iconfont ${iconPrefix.value}${item.icon}`,
          })
        : null;

    return (): VNode =>
      renderRouterLink.value
        ? h(
            RouterLink,
            {
              to: item.value.link,
              ariaLabel: linkAriaLabel.value,
              ...attrs,
              // class needs to be merged manually
              class: ["nav-link", { active: isActive.value }, attrs.class],
              onFocusOut: () => emit("focusout"),
            },
            {
              default: () => [
                slots.before?.() || renderIcon(item.value),
                item.value.text,
                slots.after?.(),
              ],
            }
          )
        : h(
            "a",
            {
              href: item.value.link,
              rel: anchorRel.value,
              target: linkTarget.value,
              ariaLabel: linkAriaLabel.value,
              ...attrs,
              // class needs to be merged manually
              class: ["nav-link external", attrs.class],
              onFocusOut: () => emit("focusout"),
            },
            [
              slots.before?.() || renderIcon(item.value),
              item.value.text,
              isBlankTarget.value ? h(ExternalLinkIcon) : null,
              slots.after?.(),
            ]
          );
  },
});