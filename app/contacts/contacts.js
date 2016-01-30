'use strict';

angular.module('myContacts.contacts', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contacts', {
        templateUrl: 'contacts/contacts.html',
        controller: 'ContactsCtrl'
    });
}])

// setting up contacts controller
.controller('ContactsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    // test method - console.log($scope);

    // initialise firebase conection
    var ref = new Firebase('https://contactbaseapp.firebaseio.com/contacts');

    // get contacts from firebase array
    $scope.contacts = $firebaseArray(ref);
    //console.log($scope.contacts);

    // show add form - function connected to + button set to ng-show
    $scope.showAddForm = function() {
        $scope.addFormShow = true;
    }

    // show EDIT form - function connected to + button set to ng-show
    $scope.showEditForm = function(contact) {
        $scope.editFormShow = true;

        // passing all UPDATED values
        $scope.id = contact.$id;
        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;
        $scope.work_phone = contact.phones[0].work;
        $scope.mobile_phone = contact.phones[0].mobile;
        $scope.home_phone = contact.phones[0].home;
        $scope.street_sddress = contact.address[0].street_address;
        $scope.city = contact.address[0].city;
        $scope.state = contact.address[0].state;
        $scope.zipcode = contact.address[0].zipcode;
    }

    // hide add form - function connected to - (minus) button set to ng-hide and function hide()..
    $scope.hide = function() {
        $scope.addFormShow = false;
        $scope.contactShow = false; // contact detailed info close
    }

    // submit contacts to firebase array which is in the $scope
    $scope.addFormSubmit = function() {
        console.log('Adding Contact ...... '); //$scope.addFormSubmit = true;

        // Assign values for firebase
        if ($scope.name) {
            var name = $scope.name
        } else {
            var name = null;
        }
        if ($scope.email) {
            var email = $scope.email
        } else {
            var email = null;
        }
        if ($scope.company) {
            var company = $scope.company
        } else {
            var company = null;
        }
        if ($scope.work_phone) {
            var work_phone = $scope.work_phone
        } else {
            var work_phone = null;
        }
        if ($scope.mobile_phone) {
            var mobile_phone = $scope.mobile_phone
        } else {
            var mobile_phone = null;
        }
        if ($scope.home_phone) {
            var home_phone = $scope.home_phone
        } else {
            var home_phone = null;
        }
        if ($scope.street_sddress) {
            var street_sddress = $scope.street_sddress
        } else {
            var street_sddress = null;
        }
        if ($scope.city) {
            var city = $scope.city
        } else {
            var city = null;
        }
        if ($scope.state) {
            var state = $scope.state
        } else {
            var state = null;
        }
        if ($scope.zipcode) {
            var zipcode = $scope.zipcode
        } else {
            var zipcode = null;
        }

        // building up JSON objects

        $scope.contacts.$add({
            imgUrl: [
                {
                    url: "app/img/comp.png",
                    2: "la.png",
                    3: "one.png"

               }
            ],
            name: name,
            email: email,
            company: company,
            phones: [
                {
                    mobile: mobile_phone,
                    home: home_phone,
                    work: work_phone
                }
            ],
            address: [
                {
                    street_address: street_sddress,
                    city: city,
                    state: state,
                    zipcode: zipcode
                }
            ]
        }).then(function(ref) { // we passing here ref = new firebase
            var id = ref.key(); // that sets the PRIMARY KEY for firebase
            console.log('Added contact with id: ' + id);

            // clear form
            clearFields();

            // Hiding the form after it is submited
            $scope.addFormShow = false;

            // sending message to the user
            $scope.msg = "Contact Added";

        });
    }


    $scope.editFormSubmit = function() {
        console.log('Updating contact...');

        // getting contact id from firebase
        var id = $scope.id;

        // getting specific record
        var record = $scope.contacts.$getRecord(id);

        // Assined new values to contacts
        record.name = $scope.name;
        record.email = $scope.email;
        record.company = $scope.company;
        record.phones[0].work = $scope.work_phone;
        record.phones[0].home = $scope.home_phone;
        record.phones[0].mobile = $scope.mobile_phone;
        record.address[0].street_address = $scope.street_address;
        record.address[0].city = $scope.city;
        record.address[0].state = $scope.state;
        record.address[0].zipcode = $scope.zipcode;

        // Save Conrtact
        $scope.contacts.$save(record).then(function(ref) {
            console.log(ref.key);
        });


        clearFields();

        // hiding the edit form
        $scope.editFormShow = false;

        $scope.msg = "Contact Updated Successful";
    }

    // Getting detailed information about contact from firbase
    $scope.showContact = function(contact) {
        console.log('Getting contact....');

        $scope.name = contact.name;
        $scope.email = contact.email;
        $scope.company = contact.company;
        $scope.work_phone = contact.phones[0].work;
        $scope.mobile_phone = contact.phones[0].mobile;
        $scope.home_phone = contact.phones[0].home;
        $scope.street_sddress = contact.address[0].street_address;
        $scope.city = contact.address[0].city;
        $scope.state = contact.address[0].state;
        $scope.zipcode = contact.address[0].zipcode;

        $scope.contactShow = true;
    }


    $scope.removeContact = function(contact) {
        console.log('Removing....');

        $scope.contacts.$remove(contact);

        $scope.msg = "Contact Have Been Removed";
    }

    // clear $scope fields
    function clearFields() {
        console.log('Clearing All Fields...');

        $scope.name = '';
        $scope.email = '';
        $scope.company = '';
        $scope.work_phone = '';
        $scope.mobile_phone = '';
        $scope.home_phone = '';
        $scope.street_sddress = '';
        $scope.city = '';
        $scope.state = '';
        $scope.zipcode = '';
    }
}]);