from dataclasses import field
from rest_framework import serializers
from accounts.models import User

from club.models import Club, Hashtag

class HashtagSerializer(serializers.ModelSerializer):
	class Meta:
		model = Hashtag
		field = ['name']

class ClubSerializer(serializers.ModelSerializer):
	user_number = serializers.IntegerField(default = 0, read_only=True)
	class Meta:
		model = Club
		fields = ['id','title','topic', 'brief_introduction', 'user_number', 'thumbnail','creator']

	def save(self, **kwargs):
		print('seri. save')
		return super().save(**kwargs)
	
	def create(self, request, validated_data):
		user = User.objects.get(id = request.user.id)
		img_data = self.context['request'].FILES
		thumbnail = img_data.getlist('thumbnail')[0]

		instance = Club.objects.create(
			title = validated_data['title'],
			topic = validated_data['topic'],
			brief_introduction= validated_data['brief_introduction'],
			thumbnail= thumbnail,
			club_master = user,
			creator = user,
		)
		instance.user_list.add(user)
		instance.save()
		return instance

