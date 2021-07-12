const user = require('./user');
const tour = require('./tour');

async function dbseed() {
    await user();
    await tour();
    console.log('Data generate successfully!!!');
}
