from django.shortcuts import get_object_or_404

from rest_framework import serializers, exceptions

from accounts.models import User

from club.models import Club, Hashtag

class HashtagSerializer(serializers.ModelSerializer):
	class Meta:
		model = Hashtag
		field = ['name']

class ClubDetailSerializer(serializers.ModelSerializer):
	class Meta:
		model = Club
		fields = ['title','topic', 'brief_introduction',
		'thumbnail', 'description', 'range_age',
		'days', 'time_zone', 'gender']

	def update(self, instance, validated_data):
		# 이미지가 없으면 이미지 빼고 update
		if not validated_data['thumbnail']:
			del validated_data['thumbnail']
		return super().update(instance, validated_data)

class ClubSerializer(serializers.ModelSerializer):
	usernum = serializers.IntegerField(read_only=True)
	class Meta:
		model = Club
		fields = ['id', 'title','topic', 'brief_introduction', 'usernum', 'thumbnail',]

	def save(self, **kwargs):
		return super().save(**kwargs)
	
	def create(self, request, validated_data):
		# 만약에 로그인 안한 유저가 요청하면~
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
			print(type(img_data.getlist('thumbnail')))
			thumbnail = img_data.getlist('thumbnail')[0]
			instance.thumbnail = thumbnail
		instance.user_list.add(user)
		instance.save()
		return instance

class JoinClubSerializer(serializers.Serializer):
	clubid = serializers.IntegerField(default=0)