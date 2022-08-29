from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer

from rest_framework import serializers
from django.core import serializers as core_sz
from accounts.models import User, UserProfile
from api.Serializers.ClubSerializer import ClubViewSerializer
from club.models import Club

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
	affiliated_club = serializers.SerializerMethodField('get_affiliated_club')
	my_club = serializers.SerializerMethodField('get_my_club')
	class Meta:
		model = UserProfile
		fields = ('id', 'image','description','affiliated_club',
					'my_club',)

	def get_affiliated_club(self, obj):
		# 지금 유져리스트에 이 유저가 들어가 있는 클럽
		user_id = User.objects.get(id = obj.user_id)
		sz = ClubViewSerializer(Club.objects.filter(user_list = user_id.id), many=True)
		return sz.data		
	
	def get_my_club(self, obj):
		user_id = User.objects.get(id = obj.user_id)
		sz = ClubViewSerializer(Club.objects.filter(master = user_id), many=True)
		return sz.data

	def save(self, **kwargs):
		# 인풋으로 들어온 유저와 로그인 되어있는 유저가 다르면 false해주자
		return super().save(**kwargs)