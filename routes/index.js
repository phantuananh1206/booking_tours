const homeRouter = require('./home');
const userRouter = require('./users');
const tourRouter = require('./tours');
const bookingRouter = require('./booking');

function route(app) {
    app.use('/', homeRouter);
    app.use('/users', userRouter);
    app.use('/tours', tourRouter);
    app.use('/booking', bookingRouter);
}

module.exports = route;
