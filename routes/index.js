const homeRouter = require('./home');
const userRouter = require('./users');
const tourRouter = require('./tours');

function route(app) {
    app.use('/', homeRouter);
    app.use('/user', userRouter);
    app.use('/tour', tourRouter);
}

module.exports = route;
