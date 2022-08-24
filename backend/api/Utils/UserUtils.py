import uuid # 완전 유닉하지않음 그래서 pk를 넣기로함 그래서 고유성 업
import hashlib #단반향 암호화, 양방향 암호화 sha256 md5 ... aes des

def create_email_key(user_id):
	random_key= str(uuid.uuid4())
	sha_data = hashlib.sha256()
	sha_data.update(str(user_id).encode('utf-8'))
	hash_key = sha_data.hexdigest()
	
	return random_key[::2] + hash_key[::2]


def get_right(user, club):
	
	if club.master.id == user.id:
		return "master"
	elif user in club.manager_list.all():
		return "manager"
	elif user in club.user_list.all():
		return "subscriber"
	return "User"