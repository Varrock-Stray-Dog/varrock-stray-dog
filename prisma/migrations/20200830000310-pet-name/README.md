# Migration `20200830000310-pet-name`

This migration has been generated at 8/30/2020, 12:03:10 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Pet" DROP COLUMN "pet",
ADD COLUMN "name" text   NOT NULL 
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200829225420-pets..20200830000310-pet-name
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
@@ -16,7 +16,7 @@
 model Pet {
 	id				String @id @default(uuid())
 	discord_id		String @unique
-	pet				String
+	name			String
 	kc				Int
 }
```


