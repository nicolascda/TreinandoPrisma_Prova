-- AddForeignKey
ALTER TABLE `entradas` ADD CONSTRAINT `entradas_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `produtos_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `saidas` ADD CONSTRAINT `saidas_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
