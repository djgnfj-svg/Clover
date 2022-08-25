from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action

from rest_framework_simplejwt.authentication import JWTAuthentication

from api.Serializers.ClubSerializer import ClubSerializer, JoinClubSerializer
from api.Serializers.ClubSerializer import ClubDetailSerializer
from api.Utils.Error_msg import error_msg, success_msg
from api.Utils.Permission import IsMaster

from club.models import Club

class ClubViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, \
	mixins.RetrieveModelMixin):
	serializer_class = ClubSerializer
	queryset = Club.objects.all()
	authentication_classes = [SessionAuthentication, JWTAuthentication]

	def get_permissions(self):
		if self.action == "update":
			self.permission_classes = [IsMaster,]
		return super().get_permissions()

	def get_serializer(self, *args, **kwargs):
		if self.action == "update":
			self.serializer_class = ClubDetailSerializer
		return super().get_serializer(*args, **kwargs)

	#클럽생성
	def create(self, request, *args, **kwargs):
		serializer = ClubSerializer(data=request.data, context={'request' : request})
		if serializer.is_valid():
			rtn = serializer.create(request, serializer.data)
			if rtn :
				return Response(ClubSerializer(rtn).data)
		else:
			return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)
	
	#클럽 권한
	@action(detail=True, methods=['get'])
	def get_right(self, requset, pk):
		club = self.get_object()
		user = requset.user

		if club.master == user:
			return Response({"right" : "master"})
		elif user in club.managerlist.all():
			return Response({"right" : "manager"})
		elif user in club.user_list.all():
			return Response({"right" : "subscriber"})
		else :
			return Response({"right" : "user"})
	

	#클럽수정
	def update(self, request,*args, **kwargs):
		serializer = ClubDetailSerializer(data=request.data, context={'request' : request})
		if serializer.is_valid():
			rtn = serializer.update(self.get_object(), serializer.data)
			if rtn :
				return Response(ClubDetailSerializer(rtn).data)
		return Response(error_msg(serializer=serializer), status=status.HTTP_400_BAD_REQUEST)

		

	

	#클럽해체
	@action(detail=True, methods=['delete'],permission_classes=[IsMaster,], \
		serializer_class=JoinClubSerializer, name="dissolution_club")
	def dissolution_club(self,request, pk):
		instance = self.get_object()
		instance.delete()
		return Response(success_msg(2002))


	#신청 | 탈퇴
	@action(detail=False, methods=['post'],	serializer_class=JoinClubSerializer, name="joinclub")
	def joinclub(self, request):
		club = get_object_or_404(Club, id=request.data['clubid'])
		if request.user in club.user_list.all():
			return Response(error_msg(2001), status=status.HTTP_403_FORBIDDEN)
		club.appli_list.add(request.user.id)
		return Response(success_msg(1001))

	@action(detail=False, methods=['post'],	serializer_class=JoinClubSerializer,name="outclub")
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