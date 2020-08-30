# Migration `20200829225420-pets`

This migration has been generated at 8/29/2020, 10:54:20 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Guild" (
"id" text   NOT NULL ,
"discord_id" text   NOT NULL ,
"prefix" text   NOT NULL DEFAULT E'!',
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Pet" (
"id" text   NOT NULL ,
"discord_id" text   NOT NULL ,
"pet" text   NOT NULL ,
"kc" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Guild.discord_id_unique" ON "public"."Guild"("discord_id")

CREATE UNIQUE INDEX "Pet.discord_id_unique" ON "public"."Pet"("discord_id")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200821102405-guild-initial..20200829225420-pets
--- datamodel.dml
+++ datamodel.dml
@@ -1,17 +1,22 @@
 // This is your Prisma schema file,
-// learn more about it in the docs: https://pris.ly/d/prisma-schema
-
 datasource db {
-  provider = "postgresql"
-  url = "***"
+	provider	= "postgresql"
+	url = "***"
 }
 generator client {
-  provider = "prisma-client-js"
+	provider	= "prisma-client-js"
 }
 model Guild {
-  id    String @id @default(uuid())
-  discord_id    String @unique
-  name    String @unique
+	id				String @id @default(uuid())
+	discord_id		String @unique
+	prefix			String @default("!")
+}
+
+model Pet {
+	id				String @id @default(uuid())
+	discord_id		String @unique
+	pet				String
+	kc				Int
 }
```


