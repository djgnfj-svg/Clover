from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action

from rest_framework_simplejwt.authentication import JWTAuthentication

from api.Serializers.ClubSerializer import (
	ClubRoughSerializder, JoinClubRoughSerializder,ClubDetailSerializer,
	ClubThumbnailSerializer, ClubViewSerializer
)

from api.Utils.Error_msg import error_msg, success_msg
from api.Utils.Permission import IsMaster

from club.models import Club

class ClubViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, \
	mixins.RetrieveModelMixin, mixins.UpdateModelMixin):

	serializer_class = ClubRoughSerializder
	queryset = Club.objects.all()
	authentication_classes = [SessionAuthentication, JWTAuthentication]

	def get_permissions(self):
		if self.action == "update":
			self.permission_classes = [IsMaster,]
		return super().get_permissions()

	def get_serializer(self, *args, **kwargs):
		if self.action == "update":
			self.serializer_class = ClubDetailSerializer
		elif self.action == "retrieve" :
			self.serializer_class = ClubViewSerializer
		return super().get_serializer(*args, **kwargs)

	#클럽생성
	def create(self, request):
		serializer = self.get_serializer(data=request.data, context={'request' : request})
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn :
				return Response(self.get_serializer(rtn).data)
		else:
			return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)
	
	#클럽 권한
	@action(detail=True, methods=['get'])
	def get_right(self, requset, pk):
		club = self.get_object()
		user = requset.user
		if club.master == user:
			return Response({"right" : "master"})
		elif user in club.manager_list.all():
			return Response({"right" : "manager"})
		elif user in club.user_list.all():
			return Response({"right" : "subscriber"})
		else :
			return Response({"right" : "user"})
	

	#클럽수정
	def update(self, request, pk):
		instance = self.get_object()
		serializer = self.get_serializer(instance, data=request.data)
		print(request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data)
		print(error_msg(serializer=serializer))
		return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)

	
	#클럽해체
	@action(detail=True, methods=['delete'],permission_classes=[IsMaster,], \
		serializer_class=JoinClubRoughSerializder, name="dissolution_club")
	def dissolution_club(self,request, pk):
		instance = self.get_object()
		instance.delete()
		return Response(success_msg(2002))

	@action(detail=True, methods=['put'], name="thumbnail",\
		serializer_class=ClubThumbnailSerializer)
	def change_thumbnail(self, request, pk):
		instance = self.get_object()
		serialzier = self.get_serializer(data = request.data, context={'request' : request})
		if serialzier.is_valid():
			serialzier.update(instance, request.data)
			return Response(success_msg(2002))
		# instance.thumbnail = request.data["thumbnail"]
		# print(type(request.data["thumbnail"]))
		# instance.update(thumbnail)
		return Response(error_msg(403))

	#신청
	@action(detail=False, methods=['post'],	serializer_class=JoinClubRoughSerializder, name="joinclub")
	def joinclub(self, request):
		club = get_object_or_404(Club, id=request.data['clubid'])
		if request.user in club.user_list.all():
			return Response(error_msg(2001), status=status.HTTP_403_FORBIDDEN)
		club.appli_list.add(request.user.id)
		return Response(success_msg(1001))

	#탈퇴
	@action(detail=False, methods=['post'],	serializer_class=JoinClubRoughSerializder,name="outclub")
	def outclub(self, request):
		club = get_object_or_404(Club, id=request.data['clubid'])
		try :
			temp = club.user_list.get(id = request.user.id)
		except :
			return Response(error_msg(404),status=status.HTTP_404_NOT_FOUND)
		club.user_list.remove(temp.id)
		club.MinusUsernum()
		return Response(success_msg(1002))
	# todo 신청취소