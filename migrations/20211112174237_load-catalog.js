
exports.up = function(knex) {
    return knex.schema.createTable("Courses", (table) => {
        table.string("class_name");
        table.string("dept");
        table.string("class_num")
        table.text("course_desc");
        table.integer("id").unique();
    }).createTable("Professors", table => {
        table.string("prof_name").unique().notNullable();
        table.integer("id").unique().notNullable();
    }).createTable("Course_Professor", table => {
        table.integer("course_id");
        table.integer("prof_id");
        table.string("satisfaction").notNullable();
        table.string("interest").notNullable();
        table.string("time_commitment").notNullable();
        table.string("difficulty").notNullable();
        table.foreign("course_id").references("Courses.id").onDelete("CASCADE");
        table.foreign("prof_id").references("Professors.id").onDelete("CASCADE");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Courses").dropTableIfExists("Professors").dropTableIfExists("Course_Professor");
};