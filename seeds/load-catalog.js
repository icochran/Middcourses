
const fs = require("fs");

exports.seed = async function (knex) {
    const contents = fs.readFileSync("./data/seed.json");
    const data = JSON.parse(contents);

    const course_data = data.map (item => { return {"class_name": item.class_name, 
    "dept": item.dept,
    "class_num": item.class_num,
    "course_desc": item.course_desc,
    "id": item.id}})

    const prof_data = []

    let prof_id_count = 0

    data.forEach (item => {
        const professors = item["profs"]
        for (let i=0; i<professors.length; i++){
            const current_prof = professors[i]
            // eslint-disable-next-line prefer-destructuring
            const prof_name = current_prof["prof_name"]
            const prof_id = prof_id_count
            prof_id_count += 1
            const new_prof = {"prof_name": prof_name, "id": prof_id}
            prof_data.push (new_prof)
        }
    });
  
    const prof_map = []

    await knex("Courses")
      .del()
      .then(() => knex.batchInsert("Courses", course_data, 100));

    await knex("Professors")
      .del()
      .then(() => knex.batchInsert("Professors", prof_data, 100));
  };