
exports.up = function(knex) {
  return knex.schema.createTable('users',(table)=>{
      table.increments();
      table.string('email');
      table.text('password');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
