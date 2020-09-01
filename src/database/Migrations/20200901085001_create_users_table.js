
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table){
        table.string('id').primary();
        table.string('email').notNullable();
        table.string('password').notNullable();
    })
    .then(()=>{
      console.log('table created')
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
