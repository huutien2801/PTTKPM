var users = [
    {id: 1 , name: 'Tien'},
    {id: 2 , name: 'Hung'},
    {id: 3 , name: 'Thoai'},
    {id: 4 , name: 'Tin'},
    {id: 5 , name: 'Thinh'}
];

module.exports.index = function(req,res){
    res.render('users/user', {
        users: users
    })
};

module.exports.search = function(req,res){
    var q = req.query.q;
    var matchedUsers = users.filter(function(obj){
        return obj.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    res.render('users/user', {
        users : matchedUsers
    });
};

module.exports.create = function(req,res){
    res.render('users/create');
};

module.exports.get = function(req,res){
    var id = parseInt(req.params.id);
    var result = users.find(function(obj){
        return obj.id === id;
    })
    res.render('users/view', {
        user: result
    });
};

module.exports.postCreate = function(req,res){
    users.push(req.body);
    res.redirect('/users');
};