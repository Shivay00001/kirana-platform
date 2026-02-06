-- FUNCTION: decrement_stock
-- PURPOSE: Atomically decrement stock for a product. Prevents race conditions.
-- RETURNS: New stock level if successful, or raises an error if insufficient stock.

create or replace function decrement_stock(row_id uuid, qty int)
returns int
language plpgsql
as $$
declare
  current_stock int;
begin
  -- Lock the row for update to prevent race conditions
  select stock into current_stock
  from products
  where id = row_id
  for update;

  if not found then
    raise exception 'Product not found';
  end if;

  if current_stock < qty then
    raise exception 'Insufficient stock for product %', row_id;
  end if;

  update products
  set stock = stock - qty
  where id = row_id;

  return current_stock - qty;
end;
$$;
