import { defineUserConfig } from "@vuepress/cli";
import type { HopeThemeOptions } from "vuepress-theme-hope";

export default defineUserConfig<HopeThemeOptions>({
  base: "/v2/seo/",

  dest: "./dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "SEO Enhance",
      description: "Using <meta> tags to Enhance Your site SEO",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "SEO 增强",
      description: "使用 <meta> tag 为你的站点提供 SEO 增强",
    },
  },

  theme: "hope",

  themeConfig: {
    hostname: "https://vuepress-theme-hope.github.io",

    author: {
      name: "Mr.Hope",
      url: "https://mrhope.site",
    },

    iconPrefix: "iconfont icon-",

    repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",

    docsDir: "docs/seo/src",

    logo: "/logo.svg",

    locales: {
      "/": {
        navbar: [
          { text: "Home", icon: "home", link: "/README.md" },
          {
            text: "Guide",
            icon: "creative",
            link: "/guide.md",
          },
          {
            text: "Config",
            icon: "config",
            link: "/config.md",
          },
        ],
      },

      "/zh/": {
        navbar: [
          { text: "主页", icon: "home", link: "/zh/README.md" },
          {
            text: "指南",
            icon: "creative",
            link: "/zh/guide.md",
          },
          {
            text: "配置",
            icon: "config",
            link: "/zh/config.md",
          },
        ],
      },
    },

    footer: "MIT Licensed | Copyright © 2019-present Mr.Hope",

    displayFooter: true,
    plugins: {
      comment: {
        type: "waline",
        serverURL: "https://vuepress-theme-hope-comment.vercel.app",
      },

      mdEnhance: {
        codegroup: true,
      },

      pwa: {
        favicon: "/v2/seo/favicon.ico",
        themeColor: "#46bd87",
        cachePic: true,
        apple: {
          icon: "/v2/seo/assets/icon/apple-icon-152.png",
          statusBarColor: "black",
        },
        msTile: {
          image: "/v2/seo/assets/icon/ms-icon-144.png",
          color: "#ffffff",
        },
        manifest: {
          name: "vuepress-plugin-seo2",
          short_name: "seo-plugin",
          icons: [
            {
              src: "/v2/seo/assets/icon/chrome-mask-512.png",
              sizes: "512x512",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/seo/assets/icon/chrome-mask-192.png",
              sizes: "192x192",
              purpose: "maskable",
              type: "image/png",
            },
            {
              src: "/v2/seo/assets/icon/chrome-512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/v2/seo/assets/icon/chrome-192.png",
              sizes: "192x192",
              type: "image/png",
            },
          ],
          shortcuts: [
            {
              name: "Guide",
              short_name: "Guide",
              url: "/v2/seo/guide.html",
              icons: [
                {
                  src: "/v2/seo/assets/icon/guide-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/seo/assets/icon/guide-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
            {
              name: "Config",
              short_name: "Config",
              url: "/v2/seo/config.html",
              icons: [
                {
                  src: "/v2/seo/assets/icon/config-maskable.png",
                  sizes: "192x192",
                  purpose: "maskable",
                  type: "image/png",
                },
                {
                  src: "/v2/seo/assets/icon/config-monochrome.png",
                  sizes: "192x192",
                  purpose: "monochrome",
                  type: "image/png",
                },
              ],
            },
          ],
        },
      },
    },
  },
});