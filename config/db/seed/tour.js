const seeder = require('mongoose-seed');
const faker = require('faker');
require('dotenv').config();

var items = [];
for (let i = 0; i < 30; i++) {
    items.push({
        name: faker.address.cityName(),
        address: faker.address.streetAddress(),
        price: faker.commerce.price(),
        vehicle: faker.vehicle.vehicle(),
        timetable: '2 days 1 night',
    });
}

var data = [
    {
        model: 'Tour',
        documents: items,
    },
];

seeder.connect(process.env.DATABASE, function () {
    // Load Mongoose models
    seeder.loadModels(['./app/models/Tour']);

    // Clear specified collections
    seeder.clearModels(['Tour'], function () {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});
