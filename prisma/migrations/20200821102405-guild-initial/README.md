# Migration `20200821102405-guild-initial`

This migration has been generated at 8/21/2020, 10:24:05 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Guild" (
"id" text   NOT NULL ,
"discord_id" text   NOT NULL ,
"name" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "Guild.discord_id_unique" ON "public"."Guild"("discord_id")

CREATE UNIQUE INDEX "Guild.name_unique" ON "public"."Guild"("name")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200821102405-guild-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,17 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Guild {
+  id    String @id @default(uuid())
+  discord_id    String @unique
+  name    String @unique
+}
```


