from django.shortcuts import get_object_or_404

from rest_framework import viewsets, mixins, exceptions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import SessionAuthentication

from rest_framework_simplejwt.authentication import JWTAuthentication

from api.Utils.Error_msg import success_msg
from api.Utils.Permission import IsManager
from api.Serializers.StaffSerializer import StaffSerializer, AppliSerializer, UserlistSerializer
from api.Serializers.ClubSerializer import UserIdSerializer

from accounts.models import User

from club.models import Club

class ClubManagerView(viewsets.GenericViewSet, mixins.ListModelMixin):
	serializer_class = UserlistSerializer
	queryset = Club.objects.all()
	authentication_classes = [SessionAuthentication, JWTAuthentication]
	permission_classes = [IsManager]

	def get_serializer_class(self):
		if self.action == 'appli_list_post':
			self.serializer_class = UserIdSerializer
		return super().get_serializer_class()
	
	def list(self, request, club_id):
		club = get_object_or_404(Club, id=club_id)
		return Response(AppliSerializer(club.manager_list,many=True).data)

	@action(detail=False, methods=['get'], name="appli_list")
	def appli_list(self, request, club_id):
		appli_list = Club.objects.get(id=club_id).appli_list.all()
		return Response(AppliSerializer(appli_list, many=True).data)

	@appli_list.mapping.post
	def appli_list_post(self, requset, club_id):
		user=User.objects.get(id = requset.data['user_id'])
		club = Club.objects.get(id=club_id)
		if user in club.user_list.all() or user not in club.appli_list.all():
			return exceptions.PermissionDenied("권한이 없습니다.")

		# todo 이부분 함수로 만들어야하나?
		club.user_list.add(user)
		club.appli_list.remove(user)
		club.PlusUsernum()
		return Response(success_msg(1001))

	@appli_list.mapping.delete
	def appli_list_delete(self, request, club_id, pk=None):
		user_id = int(request.GET.get('user_id'))
		club = get_object_or_404(Club, id=club_id)
		club.appli_list.remove(user_id)
		temp = Club.objects.get(id=club_id).appli_list.all()
		return Response(StaffSerializer(temp,many=True).data)
