myModule
    .constant("productListActiveClass", "btn-primary")
    .constant("productListPageCount", 3)
    .constant("dataUrl", "http://localhost:9001/products")
    .constant("orderUrl", "http://localhost:9001/orders")
    .controller("sportsController", function($scope, $http, dataUrl, orderUrl, cartFactory, $location){

        $scope.data = {};
        $scope.loadData = function() {
            $scope.data.error = null;
            $http.get(dataUrl).success(function (data) {
                $scope.data.products = data;
            })
                .error(function (error) {
                    $scope.data.error = error;
                });
        }
        $scope.loadData();

        $scope.sendOrder = function (shippingDetails) {
            var order = angular.copy(shippingDetails);
            order.products = cartFactory.getProducts();
            $http.post(orderUrl, order)
                .success(function (data) {
                    $scope.data.orderId = data.id;
                    cartFactory.getProducts().length = 0;
                })
                .error(function (error) {
                    $scope.data.orderError = error;
                }).finally(function () {
                    $location.path("/complete");
                });
        }
    })
    .controller("productListController", function($scope, productListActiveClass, productListPageCount, cartFactory) {

        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;

        var selectedCategory = null;
        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
            $scope.selectedPage = 1;
        }

        $scope.selectPage = function(newPage) {
            $scope.selectedPage = newPage;
        }
        $scope.categoryFilterFn = function (product) {
            return selectedCategory == null ||
                product.category == selectedCategory;
        }
        $scope.getCategoryClass = function(category) {
            return selectedCategory == category ? productListActiveClass : "";
        }
        $scope.getPageClass = function(page) {
            return $scope.selectedPage == page ? "productListActiveClass" : "";
        }
        $scope.addProductToCart = function (product) {
            cartFactory.addProduct(product.id, product.name, product.price);
        }
    })

    .controller("checkoutController", function($scope, cartFactory) {
        $scope.cartData = cartFactory.getProducts();

        $scope.total = function() {
            var total = 0;
            for (i=0; i<$scope.cartData.length; i++) {
                total += ($scope.cartData[i].price * $scope.cartData[i].count);
            }
            return total;
        }

        $scope.remove = function (id) {
            cartFactory.removeProduct(id);
        }
    })

;

