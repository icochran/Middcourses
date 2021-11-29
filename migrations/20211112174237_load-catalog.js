
exports.up = function(knex) {
    return knex.schema.createTable("Courses", (table) => {
        table.string("class_name");
        table.string("dept");
        table.string("class_num")
        table.text("course_desc");
        //table.string("profs"); 
        table.integer("id");
    }).createTable("Professors", table => {
        table.string("prof_name").unique().notNullable();
        table.integer("id").unique().notNullable();
    }).createTable("CourseProfessor", table => {
        table.integer("course_id");
        table.integer("prof_id");
        table.string("satisfaction")
        table.string("interest")
        table.string("time_commitment")
        table.string("difficulty")
        table.foreign("course_id").references("Courses.id").onDelete("CASCADE");
        table.foreign("prof_id").references("Professors.id").onDelete("CASCADE");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Courses").dropTableIfExists("Professors").dropTableIfExists("CourseProfessors");
};
