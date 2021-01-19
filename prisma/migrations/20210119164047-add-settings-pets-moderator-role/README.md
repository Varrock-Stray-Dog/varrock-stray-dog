# Migration `20210119164047-add-settings-pets-moderator-role`

This migration has been generated at 1/19/2021, 4:40:47 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Pet" ADD COLUMN "guildId" text   NOT NULL 

ALTER TABLE "public"."Settings" ADD COLUMN "pets_moderatorRole" text   
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210116152822-make-moderator-role-optional..20210119164047-add-settings-pets-moderator-role
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
@@ -12,9 +12,12 @@
 	id								String		@id	@default(uuid())
 	guildId							String		@unique
 	prefix							String		@default("~")
 	language						String		@default("en-US")
+	
 	pets_enabled					Boolean		@default(true)
+	pets_moderatorRole				String?
+
 	loot_enabled					Boolean		@default(true)
 	loot_moderatorRole				String?
 	loot_requireVerification		Boolean		@default(true)
```


