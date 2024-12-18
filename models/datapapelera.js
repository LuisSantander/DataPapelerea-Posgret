const db = require("../config/config");

const Order = {};

Order.getAll = (status) => {
  const sql = `
   SELECT id,
      order_cod,
      client_cod,
      client,
      product,
      quantity,
      production_date,
      delivery_date,
      colors, width,
      length,
      height,
      quality,
      box_type,
      zone,
      coordinates,
      status
    FROM
        orders
    WHERE status LIKE '%' || $1 || '%'
    ORDER BY
        id
  `;

  return db.manyOrNone(sql, status);
};

Order.update = (order) => {
  const sql = `
  UPDATE
  orders
  SET
  status = $2
  WHERE
  id = $1
  `;
  return db.none(sql, [order.id, order.status]);
};

Order.updateOrder = (order) => {
  const sql = `
  UPDATE
  orders
  SET
  status = 'Produccion'
  WHERE
  order_cod = $1
  `;
  return db.none(sql, [order.orderCod]);
};

Order.getPedidosRecientes = (zonas) => {
  const sql = `
    SELECT * FROM listar_pedidos_dia($1);
  `;

  return db.manyOrNone(sql, [zonas]);
};

Order.getZonas = () => {
  const sql = `
    SELECT * FROM listar_zonas();
  `;

  return db.manyOrNone(sql);
};

Order.validateCodigo = (codigo) => {
  const sql = `
    SELECT 
      COUNT(*) > 0 AS exists 
    FROM 
      orders 
    WHERE 
      client_cod = $1;
  `;

  return db.oneOrNone(sql, codigo);
};

Order.findByStatus = (status) => {
  const sql = `
    SELECT id,
      order_cod,
      client_cod,
      client,
      product,
      quantity,
      production_date,
      delivery_date,
      colors, width,
      length,
      height,
      quality,
      box_type,
      zone,
      coordinates,
      status
    FROM
        orders
    WHERE status LIKE '%' || $1 || '%'
    ORDER BY
        id
    `;

  return db.manyOrNone(sql, status);
};

Order.updatePlanning = (id) => {
  const sql = `
  UPDATE
  orders
  SET
  status = 'Despacho'
  WHERE
  id = ANY($1::int[])
  `;
  return db.none(sql, [id]);
};

Order.updatePlaca = (order_code) => {
  const sql = `
  UPDATE orders
  SET status = 'Produccion'
  WHERE order_cod = ANY($1::text[])
  `;

  return db.none(sql, [order_code]);
};

Order.getTipoa = (quality) => {
  const sql = `
    SELECT *
    FROM orders
    WHERE quality ILIKE $1 || '%'
    AND status ILIKE 'Recibido'
    AND product NOT ILIKE '%torta%'
  `;

  return db.manyOrNone(sql, [quality]);
};

Order.updatePlaca = (order_code) => {
  const sql = `
  UPDATE orders
  SET status = 'Produccion'
  WHERE order_cod = ANY($1::text[])
  `;

  return db.none(sql, [order_code]);
};


module.exports = Order;
