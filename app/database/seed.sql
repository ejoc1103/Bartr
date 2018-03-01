/* 
After sequelize syncs run below for seed information

*/



use bartr_db;

insert into bartr_db.categories (Category, updatedAt, createdAt)
values ('Technology', now(), now());

insert into bartr_db.categories (Category, updatedAt, createdAt)
values ('Furniture', now(), now());

insert into bartr_db.categories (Category, updatedAt, createdAt)
values ('Vehicles', now(), now());

insert into bartr_db.categories (Category, updatedAt, createdAt)
values ('Apparel', now(), now());

insert into bartr_db.categories (Category, updatedAt, createdAt)
values ('Sporting Goods', now(), now());

insert into bartr_db.categories (Category, updatedAt, createdAt)
values ('Other', now(), now());
