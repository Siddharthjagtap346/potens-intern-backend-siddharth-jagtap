-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "actor" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "previousHash" TEXT,
    "hash" TEXT NOT NULL,
    "merkleRoot" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Log_actor_idx" ON "Log"("actor");

-- CreateIndex
CREATE INDEX "Log_createdAt_idx" ON "Log"("createdAt");
