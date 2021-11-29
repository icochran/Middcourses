
const fs = require("fs");

exports.seed = async function (knex) {
  const contents = fs.readFileSync("./data/seed.json");
  const data = JSON.parse(contents);

  const course_data = data.map((item) => { 
    return {
      "class_name": item.class_name, 
      "dept": item.dept,
      "class_num": item.class_num,
      "course_desc": item.course_desc,
      "id": item.id
    }
  })

  //make the prof data match the layout of our table
  const prof_data = [];
  let prof_id_count = 0;
  data.forEach((item) => {
    /*****************************************
    * changed from item[profs] to items.profs??
    ******************************************/
    const professors = item.profs;
    for (let i=0; i<professors.length; i++){
      let repeat_professor_flag = false;
      const current_prof = professors[i]
      // eslint-disable-next-line prefer-destructuring
      const prof_name = current_prof.prof_name;
      const prof_id = prof_id_count;
      const new_prof = {"prof_name": prof_name, "id": prof_id};
      for(let j=0; j<prof_data.length; j++) {
        if(new_prof.prof_name === prof_data[j].prof_name) {
          repeat_professor_flag = true;
        }
      }
      if(!repeat_professor_flag){
        prof_data.push(new_prof);
        prof_id_count += 1;
      }
    }
  });
  
  const courseProf_map = [];
  data.forEach((course) => { //go through each course
    course.profs.forEach((profObject) => { //go through each professor in that course
      for(let i=0; i<prof_data.length;i++){ //find each professor's id by iterating through the prof_data
        if(prof_data[i].prof_name===profObject.prof_name){
          courseProf_map.push({
            course_id: course.id,
            prof_id: prof_data[i].id,
            satisfaction: [],
            interest: [],
            time_commitment: [],
            difficulty: []
          });
          break;
        }
      }
    });
  });

  await knex("Courses")
    .del()
    .then(() => knex.batchInsert("Courses", course_data, 100));

  await knex("Professors")
    .del()
    .then(() => knex.batchInsert("Professors", prof_data, 100));

  await knex("CourseProfessor")
    .del()
    .then(() => knex.batchInsert("Course_Professor", courseProf_map, 100));

  };