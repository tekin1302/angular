myModule
    .constant("productListActiveClass", "btn-primary")
    .constant("productListPageCount", 3)
    .constant("dataUrl", "http://localhost:9001/products")
    .controller("sportsController", function($scope, $http, dataUrl){

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
})
    .controller("productListController", function($scope, productListActiveClass, productListPageCount) {

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
    })

;

