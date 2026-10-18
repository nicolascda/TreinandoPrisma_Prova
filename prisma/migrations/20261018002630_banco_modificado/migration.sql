/*
  Warnings:

  - You are about to drop the column `valor_unitario` on the `entradas` table. All the data in the column will be lost.
  - You are about to alter the column `quantidade` on the `entradas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.
  - You are about to alter the column `quantidade` on the `produtos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.
  - You are about to drop the column `valor_unitario` on the `saidas` table. All the data in the column will be lost.
  - You are about to alter the column `quantidade` on the `saidas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Int`.

*/
-- AlterTable
ALTER TABLE `entradas` DROP COLUMN `valor_unitario`,
    MODIFY `quantidade` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `produtos` MODIFY `quantidade` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `saidas` DROP COLUMN `valor_unitario`,
    MODIFY `quantidade` INTEGER NOT NULL;
