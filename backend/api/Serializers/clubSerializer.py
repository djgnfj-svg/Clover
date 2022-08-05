from rest_framework import serializers

from club.models import Club

class ClubSerializer(serializers.ModelSerializer):
	user_number = serializers.IntegerField(default = 0, read_only=True)
	class Meta:
		model = Club
		fields = ['title', 'description', 'user_number']