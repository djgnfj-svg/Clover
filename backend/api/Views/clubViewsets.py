from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Serializers.clubSerializer import ClubSerializer, HashtagSerializer
from api.Utils.error_msg import error_msg
from club.models import Club, Hashtag


class HashtagViewSet(viewsets.ModelViewSet):
	serializer_class = HashtagSerializer
	queryset = Hashtag.objects.all()

	def list(self, request):
		tag = request.GET.get('tag', None)
		
		return Response()

class ClubViewSet(viewsets.ModelViewSet):
	serializer_class = ClubSerializer
	queryset = Club.objects.all()

	def list(self, request):
		queryset = Club.objects.all()
		serializer = ClubSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)
	
	def create(self, request, *args, **kwargs):
		serializer = ClubSerializer(data=request.data, context={'request' : request})
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn :
				return Response(ClubSerializer(rtn).data, status=status.HTTP_200_OK)
		else:
			return Response(error_msg(serializer=serializer),status=status.HTTP_400_BAD_REQUEST)
			
	

	