/* eslint-disable @typescript-eslint/naming-convention */
import type { HopeLang } from "./types.js";

export const lang2PathConfig = {
  "de-AT": "/de-at/",
  "en-US": "/en/",
  "es-ES": "/es/",
  "fr-FR": "/fr/",
  "pl-PL": "/pl/",
  "pt-BR": "/br/",
  "ru-RU": "/ru/",
  "sk-SK": "/sk/",
  "uk-UA": "/uk/",
  "vi-VN": "/vi/",
  "ja-JP": "/ja/",
  "zh-CN": "/zh/",
  "zh-TW": "/zh-tw/",
  "tr-TR": "/tr/",
};

export const supportedLangs = Object.keys(lang2PathConfig);

export const path2langConfig = Object.fromEntries(
  (supportedLangs as HopeLang[]).map((lang) => [lang2PathConfig[lang], lang])
);
