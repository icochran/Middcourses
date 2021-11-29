
exports.up = function(knex) {
    return knex.schema.createTable("Courses", (table) => {
        table.string("class_name");
        table.string("dept");
        table.string("class_num")
        table.text("course_desc");
        table.integer("id");
    }).createTable("Professors", table => {
        table.string("prof_name").notNullable();
        table.integer("id").unique().notNullable();
    }).createTable("CourseProfessor", table => {
        table.integer("course_id");
        table.integer("prof_id");
        table.float("satisfaction").notNullable();
        table.float("interest").notNullable();
        table.float("time_commitment").notNullable();
        table.float("difficulty").notNullable();
        table.float("num_reviews").notNullable();
        table.foreign("course_id").references("Courses.id").onDelete("CASCADE");
        table.foreign("prof_id").references("Professors.id").onDelete("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Courses").dropTableIfExists("Professors").dropTableIfExists("CourseProfessors");
};
