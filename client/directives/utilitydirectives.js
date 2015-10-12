procountmein.directive("pollitem",function(){

return {
        scope: {
            config: '='         
        },
        templateUrl: 'client/views/directive_templates/utilitydirectives.ng.html',
        link: function ($scope, element, attrs) { 
        	if($scope.state == "create"){



        	}

        	$scope.enterpressed = function(keyEvent,text){
        	  	 if(keyEvent.which == 13){
        	  	 	var found = false;
        	  	 	for(var x in $scope.config.polls){
        	  	 		if($scope.config.polls[x].text == $.trim(text)){
        	  	 			found = true;
        	  	 			break;
        	  	 		}
        	  	 	}
        	  	 	if(!found){
        	  	 		$scope.config.polls.push({id : guidGenerator() ,text: $.trim(text), value : false , count : 0});
        	  	 	}
        	  	 }
        	}

        	$scope.removeItem = function(index){
        		$scope.config.polls.splice(index,1);
        	}

        	$scope.changed = function(index){
        			if($scope.config.polls[index].value){
        				++$scope.config.polls[index].count;
        			}else{
        				--$scope.config.polls[index].count;
        			}

        			$scope.config.itemcheckedCallback && $scope.config.itemcheckedCallback($scope.config.id,$scope.config.polls);
        	}
        } 
    }

    function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}

});