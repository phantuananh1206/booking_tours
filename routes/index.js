const homeRouter = require('./home');
const userRouter = require('./users');
const tourRouter = require('./tours');

function route(app) {
    app.use('/', homeRouter);
    app.use('/users', userRouter);
    app.use('/tours', tourRouter);
}

module.exports = route;
