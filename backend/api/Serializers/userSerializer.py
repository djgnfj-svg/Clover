

# club 대문이미지
# 상세페이지에 저장될 이미지
# jwt 회원가입 로그인
# 
from dj_rest_auth.serializers import UserDetailsSerializer

from rest_framework import serializers

from accounts.models import User

class customUserDetailsSerializer(UserDetailsSerializer):
	email = serializers.EmailField(read_only=True)
	class Meta(UserDetailsSerializer.Meta):
		fields = ('id','username', 'email')