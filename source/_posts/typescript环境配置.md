---
title: typescript 使用
comments: true
date: 2019-02-18 08:39:39
categories: web
tags: 静态类型检测
---

1.  安装： `npm i -g typescript`

2.  安装支持 typescript 的编辑器： vscode

3.  项目中使用 typescript：`tsc --init` 创建 tsconfig.json 文件

4.  编译 typescript：`tsc`

5.  TypeScript 基本语法：

    - 基本静态类型:

      ```ts
      // Boolean
      let isAwesome: boolean = true;

      // String
      let name: string = "Chris";
      let joke: string = `
         Q: Why did the chicken cross the road?
         A: ${punchline}
      `;

      // Number
      let decimalNumber: number = 42;
      let binaryNumber: number = 0b101010; // => 42
      let octalNumber: number = 0o52; // => 42

      // array
      let myPetFamily: string[] = ["rocket", "fluffly", "harry"];
      let myPetFamily: Array<string> = ["rocket", "fluffly", "harry"];

      // tuple
      let myFavoriteTuple: [string, number, boolean];
      myFavoriteTuple = ["chair", 20, true];

      // enum
      enum Sizes {
        Small = 1,
        Medium,
        Large
      }
      Sizes.Small; // => 1
      Sizes.Medium; // => 2
      Sizes.Large; // => 3
      enum ThemeColors {
        Primary = "primary",
        Secondary = "secondary",
        Dark = "dark",
        DarkSecondary = "darkSecondary"
      }
      // any
      let whoKnows: any = 4;

      // void
      const darkestPlaceOnEarth = (): void => {
        console.log("Marianas Trench");
      };
      ```


    - 其他：

        ```ts
        // 接口
        interface Animal {
          kind: string;
          weight: number;
        }
        let dog: Animal;
        dog = {
          kind: 'mammal',
          weight: 10,
        };

        //内联注释
        let dog: {
          kind: string;
          weight: number;
        };
        dog = {
          kind: 'mammal',
          weight: 10,
        };

        //泛型
        const fillArray = <T>(len: number, elem: T) => {
          return new Array<T>(len).fill(elem);
        };
        const newArray = fillArray<string>(3, 'hi');

        //联合类型
        const sayHappyBirthdayOnFacebook = (name: string | null) => {
          if (name === null) {
            console.log('Happy birthday!');
          } else {
            console.log(`Happy birthday ${name}!`);
          }
        };
        sayHappyBirthdayOnFacebook(null); // => "Happy birthday!"
        sayHappyBirthdayOnFacebook('Jeremy'); // => "Happy birthday Jeremy!"

        //交集类型
        type Student = {
          id: string;
          age: number;
        };
        type Employee = {
          companyId: string;
        };
        let person: Student & Employee;
        person.age = 21; // ✅
        person.companyId = 'SP302334'; // ✅
        person.id = '10033402'; // ✅
        person.name = 'Henry'; // ❌ - name does not exist in Student & Employee

        //可选类型
        function callMom(message?: string) {
          if (!message) {
            console.log('Hi mom. Love you. Bye.');
          } else {
            console.log(message);
          }
        }
        // Interface describing an object containing an optional property
        interface Person {
          name: string;
          age: number;
          favoriteColor?: string; // This property is optional
        }
        ```
