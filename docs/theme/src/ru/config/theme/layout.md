---
title: Опции макета темы
icon: config
order: 4
category:
  - Конфиг
tag:
  - Конфиг темы
  - Макет
---

Следующие параметры управляют макетом темы.

<!-- more  -->

## Конфигурация панели навигации

Соответствующее руководство смотрите в разделе [Макет → Панель навигации](../../guide/layout/navbar.md).

### navbar <Badge text="Рекомендуется" type="tip" />

- Тип: `HopeThemeNavbarConfig | false`
- По умолчанию: `false`

Конфигурация панели навигации

### navbarIcon

- Тип: `boolean`
- По умолчанию: `true`

Отображать ли иконки в навигационной панели.

### navbarLayout

- Тип: `HopeNavbarLayoutOptions`

  ```ts
  type HopeThemeNavbarComponent =
    | "Brand"
    | "Links"
    | "Language"
    | "Search"
    | "Outlook"
    | "Repo";

  interface HopeNavbarLayoutOptions {
    left: HopeThemeNavbarComponent[];
    center: HopeThemeNavbarComponent[];
    right: HopeThemeNavbarComponent[];
  }
  ```

- По умолчанию: `{ left: ["Brand"], center: ["Links"], right: ["Language", "Repo", "Outlook", "Search"] }`

Настройте макет панели навигации.

### logo <Badge text="Рекомендуется" type="tip" />

- Тип: `string`
- Обязательный: Нет

Логотип панели навигации должен быть абсолютным путем относительно папки `.vuepress/public`.

### logoDark

- Тип: `string`
- Обязательный: Нет

Логотип Navbar в темном режиме должен быть абсолютным путем относительно папки `.vuepress/public`.

### repo

- Тип: `string`
- Обязательный: Нет

Ссылка на репозиторий.

### repoDisplay

- Тип: `boolean`
- По умолчанию: `true`

Отображать ли ссылку на репозиторий в панели навигации.

### repoLabel

- Тип: `string`
- Обязательный: Нет

Ярлык репозитория навигационной панели.

::: note

Тема может распознавать ссылки GitHub, Gitlab, Gitee и Bitbucket.

:::

### navbarAutoHide

- Тип: `"always" | "mobile" | "none"`
- По умолчанию: `"mobile"`

Скрывать ли панель навигации при прокрутке вниз.

### hideSiteNameonMobile

- Тип: `boolean`
- По умолчанию: `true`

Скрыть ли заголовок сайта на мобильном телефоне.

## Конфигурация боковой панели

Руководство смотрите в разделе [Макет → Боковая панель](../../guide/layout/sidebar.md).

### sidebar <Badge text="Рекомендуется" type="tip" />

- Тип: `HopeThemeSidebarConfig | "structure" | "heading" | false`
- По умолчанию: `"structure"`

Конфигурация боковой панели.

### sidebarIcon

- Тип: `boolean`
- По умолчанию: `true`

Показывать ли иконки на боковой панели.

### sidebarSorter <Badge text="Только root" />

- Тип: `HopeThemeSidebarSorter`

  ```ts
  export interface HopeThemeSidebarFileInfo {
    type: "file";
    order: number | null;
    frontmatter: HopeThemeNormalPageFrontmatter;
    pageData: HopeThemePageData;
    title: string;
    path: string;
  }
  export interface HopeThemeSidebarDirInfo {
    type: "dir";
    order: number | null;
    frontmatter: HopeThemeNormalPageFrontmatter;
    pageData: HopeThemePageData;
    info: {
      prefix: string;
      text: string;
      icon?: string;
      collapsible?: boolean;
      link?: string;
    };
    children: HopeThemeSidebarInfo[];
  }
  export type HopeThemeSidebarInfo =
    | HopeThemeSidebarFileInfo
    | HopeThemeSidebarDirInfo;
  export type HopeThemeSidebarSorterKeyWord =
    | "readme"
    | "order"
    | "date"
    | "date-desc"
    | "filename"
    | "file-number"
    | "file-number-desc"
    | "title"
    | "title-number"
    | "title-number-desc";
  export type HopeThemeSidebarSorterFunction = (
    infoA: HopeThemeSidebarInfo,
    infoB: HopeThemeSidebarInfo
  ) => number;
  ```

- По умолчанию: `["readme", "order", "title"]`

Структура сортировки боковой панели.

Вы можете:

- заполнить пользовательскую функцию
- предоставить одно или массив ключевых слов сортировщика

Доступные ключевые слова:

- `readme`: сначала `README.md` или `readme.md`
- `order`: положительный порядок сначала с его значением по возрастанию, отрицательный порядок последним с его значением по убыванию
- `date`: сортировка по дате по возрастанию
- `date-desc`: сортировка по дате по убыванию
- `title`: сортировка по названию в алфавитном порядке
- `title-number`: сортировка по алфавиту по названию и сортировка по возрастанию тех же названий с разными номерными метками
- `title-number-desc`: сортировка по алфавиту в соответствии с названием и сортировка по убыванию одинаковых названий с разными номерными метками
- `filename`: сортировка по алфавиту по имени файла
- `file-number`: сортировка по алфавиту по имени файла и сортировка по возрастанию одинаковых имен файлов с разными номерными метками
- `file-number-desc`: сортировка по алфавиту по имени файла и сортировка по убыванию одинаковых имен файлов с разными числовыми метками

### headerDepth

- Тип: `number`
- По умолчанию: `2`

Глубина вложенных заголовков в боковой панели.

## Навигация по маршруту

### breadcrumb

- Тип: `boolean`
- По умолчанию: `true`

Включить ли навигацию по маршруту глобально.

### breadcrumbIcon

- Тип: `boolean`
- По умолчанию: `true`

Показывать ли иконки в навигации по маршруту.

### prevLink

- Тип: `boolean`
- По умолчанию: `true`

Показывать ли предыдущую ссылку внизу.

### nextLink

- Тип: `boolean`
- По умолчанию: `true`

Показывать ли следующую ссылку внизу.

## Заголовок

### titleIcon

- Тип: `boolean`
- По умолчанию: `true`

Отображать ли иконку помимо заголовка страницы.

### pageInfo

- Тип: `ArticleInfo[] | false`
- По умолчанию: `["Author", "Original", "Date", "Category", "Tag", "ReadingTime"]`

Информация о статье. Порядок элементов определяет порядок отображения. Заполните `false`, чтобы отключить его.

Доступные элементы в `ArticleInfo`:

- `"Author"`: автор
- `"Date"`: дата написания
- `"Original"`: является оригинальным
- `"Category"`: категория
- `"Tag"`: теги
- `"ReadingTime"`: ожидаемое время чтения
- `"Word"`: номер слова для статьи
- `"PageView"`: просмотры страниц

## Мета

### lastUpdated

- Тип: `boolean`
- По умолчанию: `true`

Показывать ли «Последнее обновление» или нет.

### contributors

- Тип: `boolean`
- По умолчанию: `true`

Показывать ли «Контрибьюторы» или нет.

### editLink

- Тип: `boolean`
- По умолчанию: `true`

Показывать ли «Редактировать эту страницу» или нет.

### editLinkPattern

- Тип: `string`

Шаблон редактирования ссылки. В то время как `:repo` `:branch` `:path` будет автоматически заменен на `docsRepo` `docsBranch` и `docsDir + filePath`。

::: note

Тема обеспечивает встроенную поддержку GitHub, Gitlab, Gitee и Bitbucket.

:::

### docsRepo

- Тип: `string`
- По умолчанию: `repo`

Репозиторий вашей документации.

### docsBranch

- Тип: `string`
- По умолчанию: `"main"`

Ветка вашей документации.

### docsDir

- Тип: `string`
- По умолчанию: `""`

Расположение каталога документации в репозитории.

## Футер

### footer

- Тип: `string`
- Обязательный: Нет

Содержимое нижнего колонтитула по умолчанию может принимать HTMLString.

### copyright

- Тип: `string | boolean`
- По умолчанию: `"Copyright © <author>"`

Информация об авторских правах по умолчанию, установите для нее значение `false`, чтобы отключить ее по умолчанию.

### displayFooter

- Тип: `boolean`
- По умолчанию: `false`

Отображать ли нижний колонтитул по умолчанию.

## Другое

### home

- Тип: `string`
- По умолчанию: Key of current locale

Домашний путь текущей локали, используемый в качестве ссылки для возврата домой и логотипа панели навигации.

### toc {#toc-heading}

- Тип: `boolean`
- По умолчанию: `true`

Показывать ли toc list в режиме рабочего стола.
