myModule.controller("formController", function ($scope, $http) {
    $scope.person = {};
    $scope.namePattern = /^[a-zA-Z\s]{4,20}$/;
    $scope.phonePattern = /^(00[0-9]{11})|(\+[0-9]{11})$/;

    $http.get('/json/countries.json').success(function(data){
        console.log(data);
        $scope.countries = data;
    });

    $http.get('/json/cities.json').success(function(data){
        console.log(data);
        $scope.cities = data;
    });

    $scope.isAgeOk = function(age){
        var valid = parseInt(age) < 90 && !isNaN(age);
        $scope.mainForm.age.$setValidity("ageValid", valid);
    }

    $scope.save = function save(){
        $scope.personS = $scope.person;
    }
});