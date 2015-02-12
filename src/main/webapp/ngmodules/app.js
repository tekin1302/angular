var myModule = angular.module("angularTestModule", ['ngResource', 'ngRoute', 'customFilters', 'cartModule'])
        .config(function ($routeProvider) {
            $routeProvider.when("/form",
                {
                    templateUrl: '/views/form.html',
                    controller: 'formController'
                });
            $routeProvider.when("/todo",
                {
                    templateUrl: '/views/todo.html',
                    controller: 'todoController'
                });
            $routeProvider.when("/bootstrap-index",
                {
                    templateUrl: '/views/bootstrap-index.html'
                });
            $routeProvider.when("/sports",
                {
                    templateUrl: '/views/sports.html',
                    controller: 'sportsController'
                });
            $routeProvider.when("/checkout",
                {
                    templateUrl: '/views/checkoutSummary.html',
                    controller: 'checkoutController'
                });
            $routeProvider.when("/placeorder",
                {
                    templateUrl: '/views/placeOrder.html',
                    controller: 'checkoutController'
                });
            $routeProvider.when("/complete",
                {
                    templateUrl: '/views/thankYou.html',
                    controller: 'checkoutController'
                });
        })
        .directive('smartFloat', function() {
            return {
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        if (FLOAT_REGEXP.test(viewValue)) {
                            ctrl.$setValidity('float', true);
                            return parseFloat(viewValue.replace(',', '.'));
                        } else {
                            ctrl.$setValidity('float', false);
                            return undefined;
                        }
                    });
                }
            };
        })
        .filter('ignoreFromSelected', function () {
            return function (allItems, value) {
                if (!exists(value.ea) || value.ea.length == 0) {
                    return allItems;
                }
                var out = [];

                for (i=0;i<allItems.length;i++) {
                    var ignore = false;
                    for (j=0;j<value.ea.length;j++){
                        if (exists(value.ea[j].employee) && allItems[i].id == value.ea[j].employee.id && allItems[i].id != value.e) {
                            ignore = true;
                        }
                    }
                    if (!ignore) {
                        out.push(allItems[i]);
                    }
                }
                return out;
            };
        })
        .filter('hasRate', function () {
            return function (allItems, value) {
                var out = [];

                for (i=0;i<allItems.length;i++) {
                    if (exists(allItems[i].rate)) {
                        out.push(allItems[i]);
                    }
                }
                return out;
            };
        })
        .filter("checkedItems", function() {
            return function(items, showComplete) {
                var resultArr = [];
                angular.forEach(items, function(item) {
                    if (item.done == false || showComplete == true) {
                        resultArr.push(item);
                    }
                });
                return resultArr;
            }
        })
    ;