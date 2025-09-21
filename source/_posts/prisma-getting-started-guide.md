---
title: prisma 入门指南
categories: Web开发
tags: [服务端,Node.js]
comments: true
toc: true
date: 2021-12-29 14:10:45
---
最近 prisma 挺火的，他号称是下一代 nodeJs ORM, github 的 star 一直在上升，issue 也有一千多 k，连本地数据库上手玩了一下，真的很不错，附上简单的入门级操作。

## 一、初始化

### 1、下载相关包

```bash
npm install prisma typescript ts-node @types/node --save-dev
```

### 2、创建 tsconfig.json

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```

### 3、创建  Prisma schema 文件和 .env 文件

```bash
npx prisma
npx prisma init
```

### 4、连接 mysql

```ts
// prisma/schema.prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

```ts
// .env
DATABASE_URL="mysql://<USER>:<PASSWORD>@HOST:PORT/DATABASE"
```

## 二、数据库操作

### 1、使用 Prisma Migrate 创建数据表

```
<!-- prisma/schema.prisma -->
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

执行以下命令会创建一份 sql 查询语句文件并且执行，创建三张表格

```bash
npx prisma migrate dev --name init
```

### 2、数据库读写

(1) 数据库查询

创建 index.ts 文件，写入一下内容

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

以上代码实例化了 PrismaClient，prisma.user 即刚刚创建的 user 表，findMany 方法查询 user 表的所有数据，效果跟 `select * from 'user'` 一样

执行 `npx ts-node index.js` 输出为 `[]`

(2) 数据库插入数据

```ts
async function main() {
  // 使用 create 插入新的数据
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  })
  // 使用 findMany 查询数据
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
  // 使用 update 更新数据
  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  })
  console.log(post)
}
```

以上代码首先调用 create 方法写入一条数据，然后调用 findMany 查询符合条件的数据，这里的的 include 作用相当于 where