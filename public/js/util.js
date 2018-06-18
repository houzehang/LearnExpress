var util = {
	isEmpty: function(o) {
		return o == undefined || o == null || o == '' || /^\s+$/.test(o);
	}
}