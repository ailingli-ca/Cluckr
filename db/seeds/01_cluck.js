const faker = require("faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('cluckr')
  .del()
  .then(function(){
    const clucks = Array.from({length: 10}).map(()=>{
      return{
        username:faker.name.findName(),
        content:faker.lorem.paragraph(),
        image_url:faker.image.imageUrl(),
        created_at:faker.date.past(),
      }      
    })
    return knex('cluckr').insert(clucks)
  });
};
