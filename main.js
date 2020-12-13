var studentsApp = angular.module("studentsApp", []);
var studentsJson = [];
var id = 0;

studentsApp.controller("studentController", function($scope, $http) {
    $http.get('base.json').then(function(res) {
        for (var i = 0; i < res.data.length; i++) {
            studentsJson[i] = new Student(res.data[i].name, res.data[i].surname, res.data[i].age, res.data[i].average, id);
            id++
        }
        var pageModel = { students: [] };
        pageModel.students = studentsJson;
        console.log(pageModel);
        $scope.model = pageModel;

        $scope.totalAverage = totalAverageComputer(pageModel.students);
        $scope.averageAge = averageAgeComputer(pageModel.students);

        $scope.addStudent = function(newStudent) {
            var student = new Student(newStudent.name, newStudent.surname, parseInt(newStudent.age), Number(newStudent.average), id);
            $scope.model.students.push(student);
            id++;
            $scope.newStudent = { "name": "Example", "surname": "Example", "age": 0, "average": 0 };
            $scope.totalAverage = totalAverageComputer($scope.model.students);
            $scope.averageAge = averageAgeComputer($scope.model.students);
        }

        $scope.deleteStudent = function(student) {
            $scope.model.students.splice(student.id, 1);
            for (var i = 0; i < $scope.model.students.length; i++) {
                $scope.model.students[i].id = i;
            }
            id = $scope.model.students.length;
            $scope.totalAverage = totalAverageComputer($scope.model.students);
            $scope.averageAge = averageAgeComputer($scope.model.students);
        }

        $scope.editStudent = function(student, newStudent) {
            $scope.model.students[student.id].name = newStudent.name;
            $scope.model.students[student.id].surname = newStudent.surname;
            $scope.model.students[student.id].age = parseInt(newStudent.age);
            $scope.model.students[student.id].average = Number(newStudent.average);
            $scope.totalAverage = totalAverageComputer($scope.model.students);
            $scope.averageAge = averageAgeComputer($scope.model.students);
            $scope.newStudent = { "name": "Example", "surname": "Example", "age": 0, "average": 0 };
        }

        function totalAverageComputer(students) {
            var sum = 0;
            for (var i = 0; i < students.length; i++) {
                sum += students[i].average;
            }
            return Number(sum / students.length).toFixed(2);
        }

        function averageAgeComputer(students) {
            var sum = 0;
            for (var i = 0; i < students.length; i++) {
                sum += students[i].age;
            }
            return Number(sum / students.length).toFixed(1);
        }

    });
})