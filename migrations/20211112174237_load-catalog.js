
exports.up = function(knex) {
    return knex.schema.createTable("Courses", (table) => {
        table.string("class_name");
        table.string("dept");
        table.string("class_num")
        table.text("course_desc");
        table.string("profs");
        table.increments("id");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Courses");
};
