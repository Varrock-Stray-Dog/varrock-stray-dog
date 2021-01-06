# Migration `20210106230718-add-settings-language`

This migration has been generated at 1/6/2021, 11:07:18 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Settings" ADD COLUMN "language" text   NOT NULL DEFAULT E'en-US'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210106225701-guild-to-settings..20210106230718-add-settings-language
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
@@ -11,8 +11,9 @@
 model Settings {
 	id				String @id @default(uuid())
 	guildId			String @unique
 	prefix			String @default("!")
+	language		String @default("en-US")
 }
 model Pet {
 	id				String @id @default(uuid())
```


