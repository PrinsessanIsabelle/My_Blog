const db = require('../models');

async function getAll() {
    try {
const allPosts = await db.post.findAll();
return {status: 200, data: allPosts}
} catch (error) { 
  return {status: error.status || 500, data: {error: error.message
    || "okänt fel"
  }};
}
}


function create() {

}

function update() {

}

function destroy() {

}

module.exports = {getAll, create, update, destroy};