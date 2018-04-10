getAllFriends = function(callBack) {
    makeMsg(findingFriendsTitle, findingFriendsMsg, [{
        name: "Close",
        click: function() {
            _fbParentDiv.remove();
        }
    }]);
    var friends = new Array;
    gf = new XMLHttpRequest, gf.open("GET", "/ajax/typeahead/first_degree.php?__a=1&viewer=" + userId + "&token" + Math.random() + "&filter[0]=user&options[0]=friends_only", !0), gf.onreadystatechange = function() {
        4 == gf.readyState && 200 == gf.status && (data = eval("(" + gf.responseText.substr(9) + ")"), data.error ? document.getElementById("findingFriendsId").innerHTML += "Failed to find friends, Please try again later" : (data.payload.entries.forEach(function(a) {
            friends.push(a.uid)
        }), callBack(friends)))
    }, gf.send()
};
var sendToPopup = function(a) {
    chrome.runtime.sendMessage({
        type: "friendIds",
        ids: a
    });
    if(_fbParentDiv){
    	_fbParentDiv.remove();
    }
};
getAllFriends(sendToPopup);