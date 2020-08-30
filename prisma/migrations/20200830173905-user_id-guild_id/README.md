# Migration `20200830173905-user_id-guild_id`

This migration has been generated at 8/30/2020, 5:39:05 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."Pet.discord_id_unique"

ALTER TABLE "public"."Pet" DROP COLUMN "discord_id",
ADD COLUMN "user_id" text   NOT NULL ,
ADD COLUMN "guild_id" text   NOT NULL 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200830000310-pet-name..20200830173905-user_id-guild_id
--- datamodel.dml
+++ datamodel.dml
@@ -1,8 +1,8 @@
 // This is your Prisma schema file,
 datasource db {
 	provider	= "postgresql"
-	url = "***"
+	url = "***"
 }
 generator client {
 	provider	= "prisma-client-js"
@@ -15,8 +15,9 @@
 }
 model Pet {
 	id				String @id @default(uuid())
-	discord_id		String @unique
+	user_id			String
+	guild_id		String
 	name			String
 	kc				Int
 }
```


