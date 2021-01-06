# Migration `20210106225701-guild-to-settings`

This migration has been generated at 1/6/2021, 10:57:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Pet" DROP COLUMN "user_id",
DROP COLUMN "guild_id",
ADD COLUMN "userId" text   NOT NULL ,
ADD COLUMN "guildId" text   NOT NULL 

CREATE TABLE "public"."Settings" (
"id" text   NOT NULL ,
"guildId" text   NOT NULL ,
"prefix" text   NOT NULL DEFAULT E'!',
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Settings.guildId_unique" ON "public"."Settings"("guildId")

DROP TABLE "public"."Guild"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200830173905-user_id-guild_id..20210106225701-guild-to-settings
--- datamodel.dml
+++ datamodel.dml
@@ -1,23 +1,23 @@
 // This is your Prisma schema file,
 datasource db {
 	provider	= "postgresql"
-	url = "***"
+	url = "***"
 }
 generator client {
 	provider	= "prisma-client-js"
 }
-model Guild {
+model Settings {
 	id				String @id @default(uuid())
-	discord_id		String @unique
+	guildId			String @unique
 	prefix			String @default("!")
 }
 model Pet {
 	id				String @id @default(uuid())
-	user_id			String
-	guild_id		String
+	userId			String
+	guildId			String
 	name			String
 	kc				Int
 }
```


