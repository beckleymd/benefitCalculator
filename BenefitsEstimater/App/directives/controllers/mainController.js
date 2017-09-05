app.controller("myCtrl", function ($scope, CrudService) {
    //original model.
    var model = {
        employee: '',
        salary: 2000,
        payperiods: 26,
        expense: {
            annual: 0
        },
        dependents: [],
    }
     
    //if employee is set.
    $scope.employeeEntered = function () {
        return $scope.model.employee === '' ? false : true;
    }

    //adds the data to the database using a service and standard RESTful process
    $scope.create = function () {
        CrudService.create({ name: $scope.model.employee, dependents: $scope.model.dependents, salary: $scope.model.expense.annual }).then(function (data) {
            $scope.clearDependents();
            $scope.model.employee = '';
        });
    }

    //used to reset the form
    $scope.clearDependents = function () {
        $scope.model.expense.perPayperiod = 0;
        $scope.model.expense.annual = 0;

        $scope.model.dependents = [];
        drawCharts();
    }

    //removes a single dependant
    $scope.removeDependant = function (toRemove) {
        var c = $scope.model.dependents[toRemove].cost;
        $scope.model.dependents.splice(toRemove, 1);
        $scope.model.expense.annual -= c;
        drawCharts();
    }

    //creates a front end data point
    $scope.addDependant = function () {
        if ($scope.employeeEntered()) {
            var discount = .10;
            var tmp = 500;
            if ($scope.name.toLowerCase().startsWith("a")) {
                tmp = tmp * (1 - discount);
            }
            $scope.model.expense.annual += tmp;
            var d = {
                name: $scope.name,
                cost: tmp
            }
            $scope.model.dependents.push(d);
        } else {
            addEmployee($scope.name);          
        }

        //Resets the form after adding an employee or dependent
        //move to own function
        drawCharts();
        $scope.name = '';
        $(':input')
			.not(':hidden')
			.val('')
			.removeAttr('checked')
			.removeAttr('selected');
    };

    function addEmployee(name) {
        var discount = .10;
        var tmp = 1000;
        if ($scope.name.toLowerCase().startsWith("a")) {
            tmp = tmp * (1 - discount);
        }
        $scope.model.employee = $scope.name;
        $scope.model.expense.annual += tmp;
    }

    //shows visual data representation
    var chart;
    function drawCharts() {
        $scope.monthlyCost = $scope.model.expense.annual / 26;
        $scope.updateCounter();
        $scope.hardcodedGenerate();
        $scope.generateAnnual();
        $scope.generatePerPayPeriod();
    }

    //shows accessing the database and use of promisses
    $scope.updateCounter = function () {
        CrudService.getAll().then(function (data) {
            $scope.totalEmployeesEntered = data.data.length;
        });
    }
    
    $scope.model = model;

    //this is a setup function that is jujst waiting to be created
    $scope.annulalIncome = $scope.model.salary * $scope.model.payperiods;
    $scope.monthlyCost = $scope.model.expense.annual / 26;
    $scope.updateCounter();


    //These should be a single directive used three times
    $scope.generateAnnual = function () {
        var tmp = $scope.model.salary * $scope.model.payperiods;
        chart = c3.generate({
            bindto: '#annualChart',
            data: {
                columns: [
					['income', tmp],
					['benfeits', $scope.model.expense.annual]
                ],
                type: 'pie'
            },
            pie: {
                label: {
                    format: function (value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });
    }

    $scope.hardcodedGenerate = function () {
        chart = c3.generate({
            bindto: '#angularChart',
            data: {
                columns: [
					['income', $scope.model.salary],
					['benfeits', $scope.model.expense.annual]
                ],
                type: 'pie'
            },
            pie: {
                label: {
                    format: function (value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });
    }

    $scope.generatePerPayPeriod = function () {
        var tmp = $scope.model.expense.annual / 26;
    
        chart = c3.generate({
            bindto: '#perpayperiodChart',
            data: {
                columns: [
					['income', $scope.model.salary],
					['benfeits', tmp]
                ],
                type: 'pie'
            },
            pie: {
                label: {
                    format: function (value, ratio, id) {
                        return d3.format('$')(value);
                    }
                }
            }
        });
    }
    
});