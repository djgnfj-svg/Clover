from rest_framework import serializers

from accounts.models import User

from club.models import Club


class ClubDetailSerializer(serializers.ModelSerializer):
	title = serializers.CharField(max_length = 20, read_only=True)
	class Meta:
		model = Club
		fields = ['title','topic', 'brief_introduction',
		'description', 'range_age',
		'days', 'time_zone', 'gender']
	
class ClubSerializer(serializers.ModelSerializer):
	thumbnail = serializers.ImageField(write_only=True)
	class Meta:
		model = Club
		fields = ['id', 'title','topic', 'brief_introduction', 'thumbnail']
	
	def create(self, request, validated_data):
		#클럽을 만들고
		# 클럽의 썸네일을 만든다
		user =  User.objects.get(id = request.user.id)
		img_data = self.context['request'].FILES
		instance = Club.objects.create(
			title = validated_data['title'],
			topic = validated_data['topic'],
			brief_introduction= validated_data['brief_introduction'],
			master = user,
			creator = user,
		)
		if img_data.getlist('thumbnail'):
			thumbnail = img_data.getlist('thumbnail')[0]
			instance.thumbnail = thumbnail
		instance.user_list.add(user)
		instance.save()
		return instance

class JoinClubSerializer(serializers.Serializer):
	clubid = serializers.IntegerField(default=0)
