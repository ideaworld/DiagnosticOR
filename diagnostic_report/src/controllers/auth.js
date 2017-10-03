exports.check_orth = function(req){
	if (!req.session.access_token){
		return false;
	}else{
		return true;
	}
}