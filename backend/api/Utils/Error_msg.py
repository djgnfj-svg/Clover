ERROR_MSG = {
	403 : "허락 못해",
	404 : "데어터가 없습니다.",

	2001: "이미 가입된유저 입니다.",
	
}

SUCCESS_MSG = {
	1001 : "가입성공",
	1002 : "탈퇴성공",
	200 : "성공"
}

def error_msg(error_code : int = 0, serializer = None,):
	if serializer:
		return {'error_msg' : serializer.errors}
	else :
		msg = ERROR_MSG[error_code]
		return {"error_msg" : msg}

def success_msg(success_code: int = 0):
	msg = SUCCESS_MSG[success_code]
	return {'success_msg' : msg} 