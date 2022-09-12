from django.db.models import Q

from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer

from rest_framework import serializers

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
	username = serializers.SerializerMethodField('get_username')
	affiliated_club = serializers.SerializerMethodField('get_affiliated_club')
	my_club = serializers.SerializerMethodField('get_my_club')

	#todo 나중에 setting 에 있는 데이터로 바꾸기
	url = 'http://127.0.0.1:8000'
	class Meta:
		model = UserProfile
		fields = ('id','username', 'image','description','affiliated_club',
					'my_club',)

	def get_username(self, obj):
		user = User.objects.get(id= obj.user_id)
		return user.username

	def get_affiliated_club(self, obj):
		# 지금 유져리스트에 이 유저가 들어가 있는 클럽
		user = User.objects.get(id = obj.user_id)
		serializer = ClubViewSerializer(Club.objects.filter(Q(user_list = user.id) | Q(manager_list = user.id) ), many=True)
		for i in serializer.data:
			i['thumbnail'] = self.url + i['thumbnail']
		return serializer.data		
	
	def get_my_club(self, obj):
		user_id = User.objects.get(id = obj.user_id)
		serializer = ClubViewSerializer(Club.objects.filter(master = user_id), many=True)
		for i in serializer.data:
			i['thumbnail'] = self.url + i['thumbnail']
		return serializer.data

	def save(self, **kwargs):
		# 인풋으로 들어온 유저와 로그인 되어있는 유저가 다르면 false해주자
		return super().save(**kwargs)