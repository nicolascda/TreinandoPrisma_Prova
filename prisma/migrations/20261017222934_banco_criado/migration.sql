-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entradas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_produto` INTEGER NOT NULL,
    `data_entrada` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `quantidade` DECIMAL(10, 2) NOT NULL,
    `valor_unitario` DECIMAL(10, 2) NOT NULL,

    INDEX `fk_entradas`(`id_produto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `id_categoria` INTEGER NOT NULL,
    `unidade_medida` VARCHAR(20) NOT NULL,
    `valor_unitario` DECIMAL(10, 2) NOT NULL,
    `quantidade` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `estoque` INTEGER NOT NULL,

    INDEX `fk_produtos`(`id_categoria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saidas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_produto` INTEGER NOT NULL,
    `data_saida` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `quantidade` DECIMAL(10, 2) NOT NULL,
    `valor_unitario` DECIMAL(10, 2) NOT NULL,

    INDEX `fk_saidas`(`id_produto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
