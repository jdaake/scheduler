require('./calendarServer/config/config');
const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./calendarServer/routes/users.routes');
const calendarRoutes = require('./calendarServer/routes/calendar.routes');
const eventsRoutes = require('./calendarServer/routes/events.routes');
const bodyParser = require('body-parser').json();

// path to dist folder (Angular App)
app.use(express.static(__dirname + '/dist'));

// bodyparser to use req.body.someKey - npm install body-parser
app.use(bodyParser);

// Link to routes
app.use('/api/users', userRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/events', eventsRoutes);

// home route
app.get('*', (req, res) => {
    res.sendFile('/dist/index.html', {
        root: __dirname + "/"
    });
});
// app.get('*', (req, res) => res.redirect('/'));
// Or
// app.get()


// port listener
app.listen(port, () => console.log(`Calendar App listening on port ${port}!`));