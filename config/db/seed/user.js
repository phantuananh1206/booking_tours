const seeder = require('mongoose-seed');
const faker = require('faker');
require('dotenv').config();

var items = [];
for (let i = 0; i < 10; i++) {
    items.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'Test123@',
        phone_number: `012345678${i}`,
        activated: true,
    });
}

var data = [
    {
        model: 'User',
        documents: items,
    },
];

seeder.connect(process.env.DATABASE, function () {
    // Load Mongoose models
    seeder.loadModels(['./app/models/User']);

    // Clear specified collections
    seeder.clearModels(['User'], function () {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});
