angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ListCtrl', function($scope, $http, $stateParams, $ionicPopup, ServerBaseUrl) {

  $scope.alertSuccess = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Task status',
      template: 'Deleted'
    });
  };

  $scope.getAll = function() {
    $http({
      method: 'GET',
      url: ServerBaseUrl.BaseUrl + '/tasks'
    }).then(function successCallback(response) {
      $scope.tasks = response.data
    }, function errorCallback(response) {
      console.log(response)
    });
  }

  $scope.getAll()

  $scope.remove = function(id) {
    $http({
      method: 'DELETE',
      url: ServerBaseUrl.BaseUrl + '/tasks/' + id
    }).then(function successCallback(response) {
      $scope.getAll()
      $scope.alertSuccess()
    }, function errorCallback(response) {
      console.log(response)
    });
  }
})

.controller('EditCtrl', function($scope, $http, $stateParams, $ionicPopup, $location, ServerBaseUrl) {

  $scope.alertSuccess = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Task status',
      template: 'Updated'
    });
  };

  $http({
    method: 'GET',
    url: ServerBaseUrl.BaseUrl + '/tasks/' + $stateParams.taskId
  }).then(function successCallback(response) {
    $scope.task = response.data[0]
    if($scope.task.status == 1) {
      $scope.task.status = true
    }else {
      $scope.task.status = false
    }
  }, function errorCallback(response) {
    console.log(response)
  });

  $scope.updateTask = function() {
    if($scope.task.name && $scope.task.name.length > 3) {
      $http({
        method: 'PUT',
        url: ServerBaseUrl.BaseUrl + '/tasks/' + $scope.task.id,
        data: {name: $scope.task.name, status: $scope.task.status, level: $scope.task.level}
      }).then(function successCallback(response) {
        $scope.alertSuccess()
        $location.path('/tab/list')
      }, function errorCallback(response) {
        console.log(response)
      });
    }else {
      $scope.alertFailure()
    }
  }
})

.controller('AddCtrl', function($scope, $http, $location, $ionicPopup, ServerBaseUrl) {

  $scope.formsData = {
    checkbox: false,
    range: 50
  }

  $scope.alertSuccess = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Task status',
      template: 'Created'
    });
  };

  $scope.alertFailure = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Task status',
      template: 'Cannot create.. task cant be empty and length must more than 4 characters'
    });
  };

  $scope.addTask = function(task) {
    if(task && task.length > 3) {
      $http({
        method: 'POST',
        url: ServerBaseUrl.BaseUrl + '/tasks',
        data: {name: task, status: $scope.formsData.checkbox, level: $scope.formsData.range}
      }).then(function successCallback(response) {
        $scope.alertSuccess()
        $location.path('/tab/list')
      }, function errorCallback(response) {
        console.log(response)
      });
    }else {
      $scope.alertFailure()
    }
  }
});
