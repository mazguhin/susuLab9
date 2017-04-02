function User(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
};

var ViewModel = function () {
    this.localusers = ko.observableArray();
};

viewmodel = new ViewModel();

viewmodel.update = function () {
        $.ajax({
            url: '/api/users',
            type: 'GET',
            contentType: "application/json",
            success: function (users) {
                viewmodel.localusers.removeAll();
                $.each(users, function (index, user) {
                    viewmodel.localusers.push(new User(user['id'], user['name'], user['age']));
                });
            }
        });
}

viewmodel.reset = function () {
    $('#name').val('');
    $('#age').val('');
}

viewmodel.create = function () {
    $('#errors').empty();
    $('#errors').hide();
    var userName = $('#name').val();
    var userAge = $('#age').val();
        $.ajax({
            url: "api/users",
            contentType: "application/json",
            method: "POST",
            data: JSON.stringify({
                name: userName,
                age: userAge
            }),
            success: function (user) {
                viewmodel.reset();
                viewmodel.update();
            },
            error: function (jxqr, error, status) {
                if (jxqr.responseText === "") {
                    $('#errors').append("<h3>" + jxqr.statusText + "</h3>");
                }
                else {
                    var response = JSON.parse(jxqr.responseText);
                    if (response['']) {

                        $.each(response[''], function (index, item) {
                            $('#errors').append("<p>" + item + "</p>");
                        });
                    }

                    if (response['Name']) {

                        $.each(response['Name'], function (index, item) {
                            $('#errors').append("<p>" + item + "</p>");
                        });
                    }

                    if (response['Age']) {
                        $.each(response['Age'], function (index, item) {
                            $('#errors').append("<p>" + item + "</p>");
                        });
                    }
                }

                $('#errors').show();
            }
        })
}

ko.applyBindings(viewmodel);
viewmodel.update();