app.directive('mainDirective', function () {
	return{
		restrict: 'E',
		templateUrl: 'App/directives/templates/main.html'
        //add controller specific to this directive by breaking up the main controller and main html into more directives and services
	};
});