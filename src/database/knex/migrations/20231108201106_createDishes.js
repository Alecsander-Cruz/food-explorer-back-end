exports.up = knex =>
    knex.schema.createTable("dishes", table => {
        table.increments("id");
        table.text("name").notNullable();
        table
            .enum("category", ["refeicao", "sobremesa", "bebida"], {
                useNative: true,
                enumName: "categories"
            })
            .notNullable();
        table.float("price").notNullable();
        table.text("description").notNullable();
        table.text("photo");

        table.timestamp("created_at").default(knex.fn.now());
        table.timestamp("updated_at").default(knex.fn.now());
    });

exports.down = knex => knex.schema.dropTable("dishes");
