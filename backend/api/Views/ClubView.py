from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action
from api.Serializers.ClubSerializer import JoinClubSerializer

from rest_framework_simplejwt.authentication import JWTAuthentication

from api.Utils.Error_msg import error_msg, success_msg

from api.Serializers.ClubSerializer import ClubSerializer, HashtagSerializer

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
	authentication_classes = [SessionAuthentication, JWTAuthentication]
	permission_classes = [IsAuthenticatedOrReadOnly]

	def list(self, request):
		queryset = self.get_queryset()
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

	@action(detail=False, methods=['post'], serializer_class=JoinClubSerializer,
	name="joinclub")
	def joinclub(self, request):
		club = get_object_or_404(Club, id=request.data['clubid'])
		if request.user in club.user_list.all():
			return Response(error_msg(2001), status=status.HTTP_403_FORBIDDEN)
		# club.user_list.add(request.user.id)

		if len(club.appli_list) == 0:
			club.appli_list[1] = request.user.id
		else:
			club.appli_list[len(club.appli_list) + 1] = request.user.id
		club.save()
		return Response(success_msg(1001), status=status.HTTP_200_OK)

	@action(detail=False, methods=['post'], serializer_class=JoinClubSerializer,
	name="outclub")
	def outclub(self, request):
		# 유저인가 마스터인가 매니저인가 전부아니라면 에러 permission으로 가능한가?
		club = get_object_or_404(Club, id=request.data['clubid'])
		try :
			temp = club.user_list.get(id = request.user.id)
		except :
			return Response(error_msg(404),status=status.HTTP_404_NOT_FOUND)
		club.user_list.remove(temp.id)
		return Response(success_msg(1002),status=status.HTTP_200_OK)

