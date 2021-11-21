
const fs = require("fs");

exports.seed = function (knex) {
    const contents = fs.readFileSync("./data/seed.json");
    const data = JSON.parse(contents);

    const course_data = data.map (item => { return {"class_name": item.class_name, 
    "dept": item.dept,
    "class_num": item.class_num,
    "course_desc": item.course_desc,
    "id": item.id}})

    //const prof_data = data.map (item => {return {"prof_name": item}})
  
    // Deletes ALL existing entries
    // Use batch insert because we have too many articles for simple insert
    return knex("Courses")
      .del()
      .then(() => knex.batchInsert("Courses", course_data, 100));
  };