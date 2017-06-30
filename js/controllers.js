
var app = angular.module('myApp', []);
app.controller('myCtrl',['$scope','$interval', function($scope,$interval) {
    $scope.number= "";
    $scope.state = false;
    $scope.round= 0;
    $scope.numberOfFields = 3;
    $scope.points = [];
    $scope.fields = [
        {color: 'yellow'},
        {color: 'red'},
        {color:'blue'},
        {color: 'green'}
    ];
    $scope.selectTile = function(button){
        if($scope.animationPlaying==true) return;
    	$scope.fieldsSelected.push(button);
        $('.tile-'+$scope.fields[button].color).parent().addClass('light');
        var t = setTimeout(function(){ 
            $('.tile-'+$scope.fields[button].color).parent().removeClass('light');
        },700);
        if($scope.numberOfFields ==$scope.fieldsSelected.length ){
            
            var fi = 0; var fieldsSelected = ''; var fieldsPlayed ='';
            $($scope.fieldsSelected).each(function(){
                fieldsSelected += '+'+$scope.fieldsSelected[fi];
                fieldsPlayed += '+'+$scope.fieldsPlayed[fi];

                fi++;
            });

            if( fieldsPlayed == fieldsSelected)
                $scope.win();
            else 
                $scope.loose();
        }
        if($scope.numberOfFields < $scope.fieldsSelected.length ){
            $scope.loose();
        }
    }
    var stop;
    $scope.playGame = function(){
        var i =0;
        $scope.round ++;
        $scope.numberOfFields ++;
        $scope.animationPlaying=true;
        $scope.fieldsSelected = [];
        $scope.fieldsPlayed = [];
    	$scope.state = true;
        var randomNumbers = [];
        for (var i = $scope.numberOfFields - 1; i >= 0; i--) {
            var rand = Math.floor(Math.random() * 4) + 1;
            if(rand == 4) rand =0;
            randomNumbers.push(rand);
        }
    	 stop = $interval(function() {
            var selected = randomNumbers[i];
		    $('.tile-item').removeClass('light');
            $('.tile-item:eq('+selected+')').addClass('light');

            if(selected!=undefined)
                $scope.fieldsPlayed.push(''+selected+'');
            var t = setTimeout(function(){
                $('.tile-item').removeClass('light');
            },700);
            i++;
            if(i == $scope.numberOfFields){
                $interval.cancel(stop);
                $scope.animationPlaying=false;
            }
          }, 1000);
    }

    $scope.win = function(){
        $scope.points[$scope.round] = $scope.numberOfFields*10;
        $('.table tbody').append('<tr><td>Round '+$scope.round+'</td><td>'+$scope.points[$scope.round]+'</td></tr>');
        $scope.playGame();
    }
    $scope.loose = function() {
        $scope.points[$scope.round] =0;
        $('.table tbody').append('<tr><td>Round '+$scope.round+'</td><td>'+$scope.points[$scope.round]+'</td></tr>');
        $scope.playGame();
    }

 }]);