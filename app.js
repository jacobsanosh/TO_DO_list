const express = require('express');
const bparser = require('body-parser');
//exporting day
const day = require(__dirname + '/date.js')
const db = require(__dirname + '/database.js')

const app = express();
const port = 3000;
app.use(bparser.urlencoded({ extended: true }));

//setting static file
app.use(express.static(__dirname + '/public'));

//setting view engine
app.set('view engine', 'ejs');

let conn = () => {
    return new Promise((resolve, reject) => {
        let database = db.Conn();
        console.log("values is ", database)
        resolve(database);
    })

}
conn().then((todotable) => {
    // console.log("")
    app.get('/', (req, res) => {
        //console.log("home page");

        let darr = [];
        db.items('home').then((data) => {
            data.forEach(element => {
                darr.push(element.list)
            });
            res.render('list', { today: day.getToday(), tasks: darr });
        }).catch((err) => {
            console.log("error is", err)
        })


    })
    app.post('/', (req, res) => {
            console.log("post page", todotable)
            const data = new todotable({ list: req.body.task, from_who: 'home' })
            data.save()
            res.redirect('/')
        })
        //adding an delete section
    app.post('/delete', (req, res) => {
            console.log("on delete method", req.body.checkbox)
            db.delete(req.body.checkbox, 'home').then(() => {
                res.redirect('/');
            })
        })
        //adding an custom route
    app.get('/:data', (req, res) => {
        console.log(req.params.data)

    })
    app.listen(process.env.PORT | port, () => {
        console.log('listeneing to port 3000')
    })
}).catch((err) => {
    console.log("error has occured", err)
})