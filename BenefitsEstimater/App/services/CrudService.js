(function (app) {
     var CrudService = function ($http, uri){
			var getAll = function () {
					return $http.get(uri);
			};
		
			var getById = function(id) {
				return $http.get(uri + id);
			};
			
			var update = function(item) {
				return $http.put(uri + item.Id, item);
			};
			
			var create = function (item) {
				var request = $http({
				    method: 'post',
				    contentType: "application/json",
				    url: uri,			
				    data:  item
				});
				
				return request;
			};
			
			var destroy = function(item) {
				return $http.delete(uri + item.Id);
			};
			
			return{				
				getAll: getAll,
				getById: getById,
				update: update,
				create: create,
				delete: destroy				
			};
		
		}	 
	app.factory("CrudService", CrudService);
}(angular.module("benefitsCalculator")));