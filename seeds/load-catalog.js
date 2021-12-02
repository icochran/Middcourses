
const fs = require("fs");

exports.seed = function (knex) {
    const contents = fs.readFileSync("./data/seed.json");
    const data = JSON.parse(contents);
  
    // Deletes ALL existing entries
    // Use batch insert because we have too many articles for simple insert
    return knex("Courses")
      .del()
      .then(() => knex.batchInsert("Courses", data, 100));
  };