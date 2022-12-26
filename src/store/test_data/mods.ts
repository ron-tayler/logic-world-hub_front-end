import {IMod} from "@/store/objects/mods/IMod";
import {EnumModAuthorRole} from "@/store/objects/mods/EnumModAuthorRole";
import {EnumIModIssueType} from "@/store/objects/mods/EnumIModIssueType";

export const modsTestData: Map<number,IMod> = new Map()

let md_readme = `
# Описание

Этот мод добавляет модуль OR и маленький блок памяти.

## Модуль OR

Имеет 2 входа и один выход. Имеет стандартную задержку в 1 тик.
Выход активируется при активном состоянии хотя бы одного входа.

## Модуль Memory

Имеет 1 вход данных и 2 входа управления.
Первый вход управления при активации запоминает состояние входа данных.
Второй вход управления инвертирует значение в памяти.

## Тесты

- Список 1
- Список 2
  - Список 2.1
    - Список 2.1.1
    - Список 2.1.2
  - Список 2.2
- Список 3

1) Пункт 1
1) Пункт 2
1) Пункт 3
1) Пункт 4
1) Пункт 5

| Таблица для теста | qwerty |
| - | - |
| 1 | 3 |
| 2 |
| 3 |
| 4 |
| 5 |
| 6 |
| 7 |
| 8 |
| 9 |
| 10 |
`

const mod_change_log = `
# 1.2.10
- Добавил фичу 1
- Добавил фичу 2
- Исправил баг 1
- Исправил баг 2
- Исправил баг 3
- (Кажется) Исправил баг 4
# 1.1.7
- Добавил фичу 1
- Добавил фичу 2
- Исправил баг 1
- Исправил баг 2
- Исправил баг 3
- (Кажется) Исправил баг 4
# 1.1.4
- Добавил фичу 1
- Добавил фичу 2
- Исправил баг 1
- Исправил баг 2
- Исправил баг 3
- (Кажется) Исправил баг 4
`

modsTestData.set(1,{
    id: 1,
    name: "Fox Chips",
    authors: [
        {
            id: 1,
            nick: "Ron_Tayler",
            avatar: "https://imgholder.ru/50x50&text=R",
            role: EnumModAuthorRole.DEVELOPER
        },{
            id: 3,
            nick: "Kralya",
            avatar: "https://imgholder.ru/50x50&text=K",
            role: EnumModAuthorRole.DESIGNER
        }
    ],
    tags:[
        {
            id: 1,
            name: "Новые чипы"
        },{
            id: 2,
            name: "Не изменяет игру"
        },{
            id: 3,
            name: "Память"
        }
    ],
    createDate: new Date("01.15.2022 15:32"),
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam doloremque ea eaque eos explicabo, illum iusto, maxime minus mollitia, obcaecati omnis. Eligendi expedita fuga fugiat id iure nostrum, quos.",
    readme: md_readme,
    downloads: 10,
    avatar: "/src/assets/test_mod_img/img_1.jpg",
    images: [
        "/src/assets/test_mod_img/img_3.jpg",
        "/src/assets/test_mod_img/img_4.jpg",
        "/src/assets/test_mod_img/img_5.jpg",
    ],
    stars: 2,
    subscribers: 24,
    versions: [
        {
            id: 1,
            gameVersion: "0.90.563",
            modVersion: "1.1.5",
            releaseDate: new Date("11-12-2022"),
            downloads: 23
        },{
            id: 2,
            gameVersion: "0.90.563",
            modVersion: "1.1.7",
            releaseDate: new Date("11-23-2022"),
            downloads: 23
        },{
            id: 3,
            gameVersion: "0.90.563",
            modVersion: "1.1.8",
            releaseDate: new Date("11-23-2022"),
            downloads: 23
        },{
            id: 4,
            gameVersion: "0.90.563",
            modVersion: "1.1.9",
            releaseDate: new Date("11-23-2022"),
            downloads: 23
        },{
            id: 5,
            gameVersion: "0.90.563",
            modVersion: "1.1.13",
            releaseDate: new Date("11-23-2022"),
            downloads: 23
        },{
            id: 6,
            gameVersion: "0.91.601",
            modVersion: "1.2.2",
            releaseDate: new Date("11-23-2022"),
            downloads: 23
        },{
            id: 7,
            gameVersion: "0.91.601",
            modVersion: "1.2.7",
            releaseDate: new Date("11-23-2022"),
            downloads: 23
        },{
            id: 8,
            gameVersion: "0.91.601",
            modVersion: "1.2.10",
            releaseDate: new Date("11-23-2022"),
            downloads: 23
        }
    ],
    views: 13,
    changeLog: mod_change_log,
    issues: [
        {
            id: 1,
            createDate: new Date("12.18.2022 19:34"),
            createBy:{id:2, nick: "Ember"},
            header: "Добавь пожалуйста чип памяти с инкрементацией",
            type: EnumIModIssueType.IDEAS,
            posts: [
                {
                    id: 1,
                    createDate: new Date("12.18.2022 19:34"),
                    createBy: {id:2, nick: "Ember"},
                    message: "Добавь пожалуйста чип памяти который можно увеличивать и уменьшать, пусть он имеет 4 разряда. И будет возможность подключать их последовательно."
                },{
                    id: 1,
                    createDate: new Date("12.18.2022 20:10"),
                    createBy: {id:1, nick: "Ron_Tayler"},
                    message: "Отличная идея, мне она нравится. Я постараюсь добавить этот чип в следующих версиях."
                }
            ]
        },{
            id: 2,
            createDate: new Date("12.19.2022 13:03"),
            createBy:{id:3, nick:"Kralya"},
            type: EnumIModIssueType.BUGS,
            header: "[1.2.10] Память не копируется",
            posts: [
                {
                    id: 3,
                    createBy: {id:3, nick:"Kralya"},
                    createDate: new Date("12.19.2022 13:03"),
                    message: "При копировании чипа или сборного модуля, не копируется значение хранящееся в памяти. Это не создаёт проблем, но немного не удобно."
                }
            ]
        }
    ]
})
modsTestData.set(2,{
    id: 2,
    name: "Potato Chips",
    authors: [
        {
            id: 2,
            nick: "Ember",
            avatar: "https://imgholder.ru/500x500&text=Ember",
            role: EnumModAuthorRole.DEVELOPER
        }
    ],
    tags: [
        {
            id: 1,
            name: "Новые чипы"
        },{
            id: 2,
            name: "Не изменяет игру"
        }
    ],
    createDate: new Date("12-11-2022"),
    description: "Небольшое описание",
    readme: "Большущее описание",
    downloads: 10,
    avatar: "/src/assets/test_mod_img/img_2.jpg",
    images: [
        "/src/assets/test_mod_img/img_1.jpg",
        "/src/assets/test_mod_img/img_3.jpg",
        "/src/assets/test_mod_img/img_4.jpg",
        "/src/assets/test_mod_img/img_5.jpg",
        "/src/assets/test_mod_img/img_6.jpg",
        "/src/assets/test_mod_img/img_7.jpg",
        "/src/assets/test_mod_img/img_8.jpg",
    ],
    stars: 2,
    subscribers: 19,
    versions: [
        {
            id: 1,
            gameVersion: "0.90.563",
            modVersion: "1.7.3",
            releaseDate: new Date("12-11-2022"),
            downloads: 23
        },{
            id: 2,
            gameVersion: "0.91.601",
            modVersion: "1.2.10",
            releaseDate: new Date("23-11-2022"),
            downloads: 23
        }
    ],
    views: 13,
    changeLog: "Списка нету",
    issues: []
})

