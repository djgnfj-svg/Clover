ERROR_MSG = {
	404 : "데어터가 없습니다."
}

def error_msg(error_code : int = 0, serializer = None,):
	if serializer is not None:
		return {'error_msg' : serializer.errors}
	else :
		msg = ERROR_MSG[error_code]
		return {"error_msg" : msg}