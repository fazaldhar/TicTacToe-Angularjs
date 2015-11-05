'use strict';

var tictactoe = angular.module('tictactoe', []);

tictactoe.controller('ctrlTictactoe', ['$scope','$timeout',
    function($scope,$timeout) {

        $scope.boxes =[
            {
                'className' : 'box1',
                'marked' : false,
                'markedImage' : ''
            },
            {
                'className' : 'box2',
                'marked' : false,
                'markedImage' : ''
            },
            {
                'className' : 'box3',
                'marked' : false,
                'markedImage' : ''
            },
            {
                'className' : 'box4',
                'marked' : false,
                'markedImage' : ''
            },
            {
                'className' : 'box5',
                'marked' : false,
                'markedImage' : ''
            },
            {
                'className' : 'box6',
                'marked' : false,
                'markedImage' : ''
            },
            {
                'className' : 'box7',
                'marked' : false,
                'markedImage' : ''
            },
            {
                'className' : 'box8',
                'marked' : false,
                'markedImage' : ''
            },
            {
                'className' : 'box9',
                'marked' : false,
                'markedImage' : ''
            }
        ];
        var possibleComb = ['1,2,3','4,5,6','7,8,9','1,4,7','2,5,8','3,6,9','1,5,9','3,5,7'],clickNum = 0;
        $scope.winnerPopupShowHide = true;
        $scope.finalDec = "Start Game";
        $scope.playerColor = true;

        $scope.playAreaClick = function(thisBox) {
            console.log('thisBox');
            if(!thisBox.marked){
                if(clickNum % 2 == 0) {
                    $scope.winner = "Player 1";
                    thisBox.markedImage = 'crossImg';
                    $scope.playerColor = false;
                } else {
                    $scope.winner = "Player 2";
                    thisBox.markedImage = 'circleImg';
                    $scope.playerColor = true;
                }
                clickNum++;  
                thisBox.marked = true;
                $scope.combinationCheck(thisBox.className,thisBox.markedImage);
                $scope.noOtherMoves();  
            }
        }

        $scope.combinationCheck = function(boxNum , selectedImage) {
            var boxNumber = boxNum.slice(-1);
            $scope.won = false;
            angular.forEach(possibleComb,function(val,key){
                if(val.indexOf(boxNumber) != -1 && !$scope.won) {
                    var checkNum = val.split(',');
                    var inc = 0;
                    angular.forEach(checkNum, function(numVal,numKey){
                        if($scope.boxes[numVal-1].markedImage == selectedImage){
                            inc++;
                        }
                    });
                    if(inc == 3) {
                        $scope.won = true;
                        $scope.showWinnerPopup(val,selectedImage);
                    }
                }
            });
        }

        $scope.noOtherMoves = function() {
            var flag = false;
            angular.forEach($scope.boxes, function(thisVal) {
                if(!thisVal.marked) {
                    flag = true;
                }
            })
            if(!flag && !$scope.won) {
                $scope.winnerPopupShowHide = true;
                $scope.finalDec ='Its a tie, play again.';
            }
        }

        $scope.showWinnerPopup = function(val, selectedImage) {
            var splitVal = val.split(',');
            angular.forEach(splitVal, function(thisVal) {
                $scope.boxes[thisVal-1].markedImage = "red"+selectedImage;
                $scope.boxes[thisVal-1].marked = true;
            })
            angular.forEach($scope.boxes,function(val,key){$scope.boxes[key].marked = true;})
            $timeout(function(){
                $scope.winnerPopupShowHide = true;
                $scope.finalDec = 'Congratulations ' + $scope.winner + ' has won the game';
            },500)
        }

        $scope.popupOkButn = function() {
            $scope.winnerPopupShowHide = false;
            clickNum = 0;
            $scope.playerColor = true;
            angular.forEach($scope.boxes, function(thisVal , thisKey) {
                thisVal.markedImage = '';
                thisVal.marked = false;
            });
        }
    }
]);
