SELECT
  `p`.`id` AS `id`,
  `p`.`nome` AS `nome_produto`,
  `c`.`nome` AS `categoria`,
  `p`.`unidade_medida` AS `unidade_medida`,
  `p`.`quantidade` AS `quantidade`,
  `p`.`valor_unitario` AS `valor_unitario`,
  round(`p`.`quantidade` * `p`.`valor_unitario`, 2) AS `valor_total`
FROM
  (
    `treinamento`.`produtos` `p`
    JOIN `treinamento`.`categorias` `c` ON(`c`.`id` = `p`.`id_categoria`)
  )