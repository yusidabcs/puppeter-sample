const express = require('express')
const app = express()
const port = 3030

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', (req, res) => {
    res.render('welcome');
})

app.get('/profile', (req, res) => {
    
    res.render('profile', {user: 'Agus'});

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})