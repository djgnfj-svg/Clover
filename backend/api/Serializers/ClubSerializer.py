from rest_framework import serializers, exceptions

from accounts.models import User
from api.Serializers.ClubImgSerializer import ClubthumbnailSerializer
from api.Serializers.ClubImgSerializer import ClubDetailImgSerializer

from club.models import Club, ClubThumbnail


class ClubDetailSerializer(serializers.ModelSerializer):
	title = serializers.CharField(max_length = 20, read_only=True)
	class Meta:
		model = Club
		fields = ['title','topic', 'brief_introduction',
		'description', 'range_age',
		'days', 'time_zone', 'gender']
	
class ClubSerializer(serializers.ModelSerializer):
	thumbnail = ClubthumbnailSerializer(write_only=True)
	class Meta:
		model = Club
		fields = ['id', 'title','topic', 'brief_introduction', 'thumbnail']
	
	def create(self, request, validated_data):
		#클럽을 만들고
		# 클럽의 썸네일을 만든다
		user =  User.objects.get(id = request.user.id)
		instance = Club.objects.create(
			title = validated_data['title'],
			topic = validated_data['topic'],
			brief_introduction= validated_data['brief_introduction'],
			master = user,
			creator = user,
		)
		instance.user_list.add(user)
		instance.save()
		
		img_data = self.context['request'].FILES
		if img_data.getlist('thumbnail.thumbnail'):
			thumbnail = ClubThumbnail.objects.create(
				thumbnail = img_data.getlist('thumbnail.thumbnail')[0],
				club = instance
			)
			thumbnail.save()
		return instance

class JoinClubSerializer(serializers.Serializer):
	clubid = serializers.IntegerField(default=0)
