// i am commenting below few lines because redis is used when we want to scale our project
// but will use it while making another projects


const kue = require('kue');

const queue = kue.createQueue();

module.exports = queue;