/*
  Warnings:

  - You are about to drop the column `email` on the `foodReservation` table. All the data in the column will be lost.
  - You are about to drop the column `mealType` on the `foodReservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "foodReservation" DROP COLUMN "email",
DROP COLUMN "mealType";
