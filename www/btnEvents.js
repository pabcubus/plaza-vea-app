document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown() {
	var controller	= angular.element(document.getElementById('plaza-vea-body'));
	var scope		= controller.scope();

	scope.ac.backBtnEvent();
}
