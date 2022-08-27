from rest_framework import serializers, exceptions

from accounts.models import User

from club.models import Club

class ClubThumbnailSerializer(serializers.ModelSerializer):
	class Meta:
		model = Club
		fields = ['thumbnail']

class ClubViewSerializer(serializers.ModelSerializer):
	class Meta:
		model = Club
		fields = ['id', 'title','topic', 'brief_introduction', 'thumbnail']

class ClubDetailSerializer(serializers.ModelSerializer):
	title = serializers.CharField(max_length = 20, read_only=True)
	class Meta:
		model = Club
		fields = ['title','topic', 'brief_introduction',
		'description', 'range_age',
		'days', 'time_zone', 'gender']

class ClubRoughSerializder(serializers.ModelSerializer):
	class Meta:
		model = Club
		fields = ['id', 'title','topic', 'brief_introduction']
	
	def create(self, request, validated_data):
		try :
			user = User.objects.get(id = request.user.id)
		except Exception  as e:
			raise exceptions.PermissionDenied("로그인을 하시지 않습니다.")
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

class JoinClubRoughSerializder(serializers.Serializer):
	clubid = serializers.IntegerField(default=0)
