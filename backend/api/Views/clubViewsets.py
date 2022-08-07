from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Serializers.clubSerializer import ClubSerializer, HashtagSerializer
from club.models import Club, Hashtag


class HashtagViewSet(viewsets.ModelViewSet):
	serializer_class = HashtagSerializer
	queryset = Hashtag.objects.all()

class ClubViewSet(viewsets.ModelViewSet):
	serializer_class = ClubSerializer
	queryset = Club.objects.all()

	def list(self, request):
		queryset = Club.objects.all()
		serializer = ClubSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)