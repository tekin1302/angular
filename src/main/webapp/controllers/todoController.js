myModule.controller("todoController", function($scope, $http){

    $scope.todo = {
        user: "Adam"
    };

    $http.get("/json/todo.json").success(function(data){
        $scope.todo.items = data;
    });
    $scope.incompleteCount = function() {
        var count = 0;
        angular.forEach($scope.todo.items, function(item) {
            if (!item.done) {
                count++;
            }
        });
        return count;
    }

    $scope.addNew = function(action) {
        $scope.todo.items.push({action: action.name, done: false});
        action.name=null;
    }

    $scope.showComplete = false;

    $scope.warningLevel = function () {
        return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
    }
});