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
    const professors = item.profs;
    for (let i=0; i<professors.length; i++){
      let repeat_professor_flag = false;
      const current_prof = professors[i]
      // eslint-disable-next-line prefer-destructuring
      let prof_name = current_prof.prof_name;
      prof_name = prof_name.trim()
      const new_prof = {"prof_name": prof_name, "id": prof_id_count};

      //just one prof
      if (!(prof_name.includes(":"))){
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

      else{
        //pushing the fall professor for the class
        if (prof_name.includes("Fall 2021")) {
            const ind = prof_name.indexOf(":") + 2;
            const lInd = prof_name.indexOf(";");
            let fall_prof_name = prof_name.substring(ind, lInd)
            fall_prof_name = fall_prof_name.trim()
            const fall_prof = {"prof_name": fall_prof_name, "id": prof_id_count}
            //pushing to DB
            for(let j=0; j<prof_data.length; j++) {
                if(fall_prof.prof_name === prof_data[j].prof_name) {
                repeat_professor_flag = true;
                }
            }        
            if(!repeat_professor_flag){
                prof_data.push(fall_prof);
                prof_id_count += 1;
            }
        }
        
        //pushing the spring professor for the class
        if (prof_name.includes("Spring 2022")) {
            const lInd = prof_name.indexOf(";");
            const ind2 = prof_name.indexOf(":", lInd) + 2;
            let spring_prof_name = prof_name.substring(ind2)
            spring_prof_name = spring_prof_name.trim()
            const spring_prof = {"prof_name": spring_prof_name, "id": prof_id_count}
            //pushing to DB
            for(let j=0; j<prof_data.length; j++) {
                if(spring_prof.prof_name === prof_data[j].prof_name) {
                repeat_professor_flag = true;
                }
            }        
            if(!repeat_professor_flag){
                prof_data.push(spring_prof);
                prof_id_count += 1;
            }
        }
      }
    }
  });
  
  const course_prof_map = [];
  data.forEach((course) => { //go through each course
    course.profs.forEach((prof_object) => { //go through each professor in that course
      for(let i=0; i<prof_data.length;i++){ //find each professor's id by iterating through the prof_data
        if(prof_data[i].prof_name===prof_object.prof_name){
          course_prof_map.push({
            course_id: course.id,
            prof_id: prof_data[i].id,
            satisfaction: "",
            interest: "",
            time_commitment: "",
            difficulty: ""
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

  await knex("Course_Professor")
    .del()
    .then(() => knex.batchInsert("Course_Professor", course_prof_map, 100));

  };