# Migration `20210116151122-dates-and-settings`

This migration has been generated at 1/16/2021, 3:11:22 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Pet" ADD COLUMN "date" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" timestamp(3)   

ALTER TABLE "public"."Settings" ADD COLUMN "pets_enabled" boolean   NOT NULL DEFAULT true,
ADD COLUMN "loot_enabled" boolean   NOT NULL DEFAULT true,
ADD COLUMN "loot_moderatorRole" boolean   NOT NULL DEFAULT true,
ADD COLUMN "loot_requireVerification" boolean   NOT NULL DEFAULT true,
ADD COLUMN "createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "updatedAt" timestamp(3)   ,
ALTER COLUMN "prefix" SET DEFAULT E'~'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210106230718-add-settings-language..20210116151122-dates-and-settings
--- datamodel.dml
+++ datamodel.dml
@@ -1,24 +1,35 @@
 // This is your Prisma schema file,
 datasource db {
 	provider	= "postgresql"
-	url = "***"
+	url = "***"
 }
 generator client {
 	provider	= "prisma-client-js"
 }
 model Settings {
-	id				String @id @default(uuid())
-	guildId			String @unique
-	prefix			String @default("!")
-	language		String @default("en-US")
+	id								String		@id	@default(uuid())
+	guildId							String		@unique
+	prefix							String		@default("~")
+	language						String		@default("en-US")
+	pets_enabled					Boolean		@default(true)
+	loot_enabled					Boolean		@default(true)
+	loot_moderatorRole				Boolean		@default(true)
+	loot_requireVerification		Boolean		@default(true)
+
+	createdAt 						DateTime	@default(now())
+	updatedAt 						DateTime?	@updatedAt
 }
 model Pet {
-	id				String @id @default(uuid())
-	userId			String
-	guildId			String
-	name			String
-	kc				Int
+	id								String		@id @default(uuid())
+	userId							String
+	guildId							String
+	name							String
+	kc								Int
+	date							DateTime	@default(now())
+
+	createdAt 						DateTime	@default(now())
+	updatedAt 						DateTime?	@updatedAt
 }
```


