-- CreateEnum
CREATE TYPE "PlaceCategory" AS ENUM ('RESTAURANT', 'BAR', 'PUB', 'CAFE', 'OTHER');

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" "PlaceCategory" NOT NULL,
    "rating" DOUBLE PRECISION,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "imageUrl" TEXT,
    "source" TEXT,
    "sourceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Place_lat_idx" ON "Place"("lat");

-- CreateIndex
CREATE INDEX "Place_lng_idx" ON "Place"("lng");

-- CreateIndex
CREATE INDEX "Place_category_idx" ON "Place"("category");

-- CreateIndex
CREATE UNIQUE INDEX "Place_source_sourceId_key" ON "Place"("source", "sourceId");
