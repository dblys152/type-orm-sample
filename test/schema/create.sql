create table if not exists "coupon"
(
	id varchar(39) primary key,
	coupon_type     varchar(40) not null,
	discount_type   varchar(40) not null,
	discount_value  int not null,
	created_at      timestamp default now() not null,
	modified_at     timestamp default now() not null,
	deleted_at      timestamp,
	version         bigint
);

create table if not exists "user_coupon"
(
	id varchar(39) primary key,
	user_id         varchar(39) not null,
	coupon_id       varchar(39) not null,
	status          varchar(10) not null,
  started_at      timestamp not null,
  ended_at        timestamp not null,
	created_at      timestamp default now() not null,
	modified_at     timestamp default now() not null,
	version         bigint
);

create table if not exists "user_coupon_user_membership_mapping"
(
	id varchar(39) primary key,
	user_coupon_id      varchar(39) not null,
	user_membership_id  varchar(39) not null,
	created_at          timestamp default now() not null,
	version             bigint
);