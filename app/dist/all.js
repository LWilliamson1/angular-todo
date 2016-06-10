require('angular');
global.jQuery = require('jquery');
require('bootstrap');

angular.module('app', [])
	.controller('TodoController', function($scope){
//	$scope.first = 1;
//	$scope.second = 1;

	$scope.newTodo="";
/*	$scope.updateValue  = function() {
		$scope.calculation = $scope.first + '  +  ' + $scope.second + " = " + (+$scope.first + +$scope.second);

	} 
*/
	$scope.toggleComplete = function () {
		this.todo.complete = !this.todo.complete;
		console.log($scope.todos);

	};
	$scope.addTodo = function() { 
		if(!$scope.addTodoForm.$valid){
			return;
		}
		$scope.todos.push({description:$scope.newTodo, complete:false});
	};

	$scope.cleanTodos = function() {
		$scope.oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach($scope.oldTodos, function(todo){
			if(!todo.complete){
				$scope.todos.push(todo);
			}
		});
	};

	$scope.todosCompleted = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			count += todo.complete ? 1 : 0;
		});
		return count;
	};

	$scope.todosTotal = function() {
		return $scope.todos.length;
	};

	$scope.todos = [
		{
			description: 'Take out trash',
			complete: true,

		}, {
			description: 'Wash dishes',
			complete: false,
		}

	];

});