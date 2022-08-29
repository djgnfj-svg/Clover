from django.shortcuts import get_object_or_404

from rest_framework import serializers
from club.models import ClubDetailImg

from club.models import Club

class ClubDetailImgSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)
    class Meta:
        model = ClubDetailImg
        fields = ["image"]

    def create(self, club_id, validated_data):
        img_data = self.context['request'].FILES
        club = get_object_or_404(Club, id = club_id)
        for img in img_data.getlist('image'):
            instance= ClubDetailImg.objects.create(
                image=img, club = club)
        return instance
    