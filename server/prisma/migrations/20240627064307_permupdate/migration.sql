/*
  Warnings:

  - You are about to drop the column `name` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Permission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[role]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_userId_fkey";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "permissions" TEXT[],
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Permission_role_key" ON "Permission"("role");
