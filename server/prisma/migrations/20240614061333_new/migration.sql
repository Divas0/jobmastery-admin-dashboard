/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_guestId_fkey";

-- DropIndex
DROP INDEX "User_age_name_key";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "guestId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
ADD COLUMN     "contact" INTEGER,
ALTER COLUMN "isAdmin" SET DEFAULT false;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
