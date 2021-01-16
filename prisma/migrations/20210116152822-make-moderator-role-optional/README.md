# Migration `20210116152822-make-moderator-role-optional`

This migration has been generated at 1/16/2021, 3:28:22 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Settings" DROP COLUMN "loot_moderatorRole",
ADD COLUMN "loot_moderatorRole" text   
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210116151122-dates-and-settings..20210116152822-make-moderator-role-optional
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
@@ -14,9 +14,9 @@
 	prefix							String		@default("~")
 	language						String		@default("en-US")
 	pets_enabled					Boolean		@default(true)
 	loot_enabled					Boolean		@default(true)
-	loot_moderatorRole				Boolean		@default(true)
+	loot_moderatorRole				String?
 	loot_requireVerification		Boolean		@default(true)
 	createdAt 						DateTime	@default(now())
 	updatedAt 						DateTime?	@updatedAt
```


