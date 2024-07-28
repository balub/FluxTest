-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Events_id_key" ON "Events"("id");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
