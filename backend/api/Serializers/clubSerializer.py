from dataclasses import field
from rest_framework import serializers

from club.models import Club, Hashtag

class HashtagSerializer(serializers.ModelSerializer):
	class Meta:
		model = Hashtag
		field = ['name']

class ClubSerializer(serializers.ModelSerializer):
	user_number = serializers.IntegerField(default = 0, read_only=True)
	class Meta:
		model = Club
		fields = ['title', 'description', 'user_number']



