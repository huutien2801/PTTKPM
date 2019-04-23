var express = require("express")
var bodyParser = require('body-parser')
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var port = 3000;


var users = [
    {id: 1 , name: 'Tien'},
    {id: 2 , name: 'Hung'},
    {id: 3 , name: 'Thoai'},
    {id: 4 , name: 'Tin'},
    {id: 5 , name: 'Thinh'}
];

app.get('/', function(request,response){
	response.render("home");	
} );

app.get('/users', function(req,res){
    res.render('users/user', {
        users: users
    });
});

app.get('/users/search', function(req,res){
    var q = req.query.q;
    var matchedUsers = users.filter(function(obj){
        return obj.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    res.render('users/user', {
        users : matchedUsers
    });
})

app.get('/users/create', function(req,res){
    res.render('users/create');
})

app.get('/users/:id',function(req,res){
    var id = parseInt(req.params.id);
    var result = users.find(function(obj){
        return obj.id === id;
    })
    res.render('users/view', {
        user: result
    });
})

app.post('/users/create', function(req,res){
    users.push(req.body);
    res.redirect('/users');
})

app.listen(port, function(){
    console.log("Hello world on port 3000!")	
});