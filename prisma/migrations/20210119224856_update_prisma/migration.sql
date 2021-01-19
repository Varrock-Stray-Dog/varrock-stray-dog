-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "prefix" TEXT NOT NULL DEFAULT E'~',
    "language" TEXT NOT NULL DEFAULT E'en-US',
    "pets_enabled" BOOLEAN NOT NULL DEFAULT true,
    "pets_moderatorRole" TEXT,
    "loot_enabled" BOOLEAN NOT NULL DEFAULT true,
    "loot_requireVerification" BOOLEAN NOT NULL DEFAULT true,
    "loot_moderatorRole" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "kc" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings.guildId_unique" ON "Settings"("guildId");
