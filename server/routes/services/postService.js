const { createResponseSuccess } = require('../../helpers/responseHelper');
const db = require('../models');

async function getAll() {
    try {
const allPosts = await db.post.findAll();
return createResponseSuccess(allPosts);
} catch (error) { 
  return createResponseError(error.status, error.message)
  }}



function create() {

}

function update() {

}

function destroy() {

}

module.exports = {getAll, create, update, destroy};