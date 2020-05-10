var fashionApp = angular.module('fashionApp', []);

function fileModel($parse, $q) {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel),
          modelSetter = model.assign;
        element.bind("change", function() {
          scope.$apply(function() {
            var file = element[0].files[0];
            getFileBuffer(file).then(function(resp) {
              modelSetter(scope, resp);
            });
          });
        });
      }
    };
    function getFileBuffer(file) {
      var deferred = new $q.defer();
      var reader = new FileReader();
      reader.onloadend = function(e) {
        deferred.resolve(e.target.result);
      };
      reader.onerror = function(e) {
        deferred.reject(e.target.error);
      };
      reader.readAsDataURL(file);
      return deferred.promise;
    }
     }
  

fashionApp.directive('fileModel',fileModel);

fashionApp.controller('imageUploadController',  function($scope,$http) {
    $scope.uploadFile = function() {
        $scope.splittedArr = $scope.myFile.split(",")
        console.log($scope.splittedArr[1]);

        data = {"image":$scope.splittedArr[1]}

        headers =  {'Accept': 'application/json',"Content-Type": "application/json"}
        $http.post("http://127.0.0.1:5000/classifyimage",data,headers)
        .then(function(res){
            console.log(res);
            $scope.result = res.data;            
        },
        function(err){
            console.log(err);
            
        });
        
   
    }

});