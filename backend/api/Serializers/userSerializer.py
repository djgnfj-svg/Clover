from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer

from rest_framework import serializers

from accounts.models import User, UserProfile

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'

class customUserDetailsSerializer(UserDetailsSerializer):
	email = serializers.EmailField(read_only=True)
	class Meta(UserDetailsSerializer.Meta):
		fields = ('id','username', 'email')


class customRegistrationSerializer(RegisterSerializer):
	def save(self, request):
		user = super().save(request)
		UserProfile.objects.create(user=user,)
		return user

class UserPofileSerializer(serializers.ModelSerializer):
	club_list = serializers.ListField(read_only = True)
	class Meta:
		model = UserProfile
		fields = ('image','description','club_list','user')

	def save(self, **kwargs):
		# 인풋으로 들어온 유저와 로그인 되어있는 유저가 다르면 false해주자
		return super().save(**kwargs)