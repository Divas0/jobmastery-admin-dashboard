/*
  Warnings:

  - You are about to drop the `Subcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategorySubcategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostSubcategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategorySubcategories" DROP CONSTRAINT "_CategorySubcategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategorySubcategories" DROP CONSTRAINT "_CategorySubcategories_B_fkey";

-- DropForeignKey
ALTER TABLE "_PostSubcategories" DROP CONSTRAINT "_PostSubcategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostSubcategories" DROP CONSTRAINT "_PostSubcategories_B_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "subcategories" TEXT;

-- DropTable
DROP TABLE "Subcategory";

-- DropTable
DROP TABLE "_CategorySubcategories";

-- DropTable
DROP TABLE "_PostSubcategories";
