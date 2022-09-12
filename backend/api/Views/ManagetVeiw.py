
from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import SessionAuthentication

from rest_framework_simplejwt.authentication import JWTAuthentication

from api.Utils.Error_msg import error_msg, success_msg
from api.Utils.Permission import IsManager
from api.Serializers.StaffSerializer import StaffSerializer, AppliSerializer, UserlistSerializer
from api.Serializers.ClubSerializer import UseridSz

from accounts.models import User

from club.models import Club

class ClubManagerView(viewsets.GenericViewSet, mixins.DestroyModelMixin, mixins.ListModelMixin):
	serializer_class = UserlistSerializer
	queryset = Club.objects.all()
	authentication_classes = [SessionAuthentication, JWTAuthentication]
	permission_classes = [IsManager]

	def get_serializer_class(self):
		if self.action == 'appli_list_post':
			self.serializer_class = UseridSz
		return super().get_serializer_class()

	@action(detail=False, methods=['get'], name="appli_list")
	def appli_list(self, request, club_id):
		temp = Club.objects.get(id=club_id).appli_list.all()
		return Response(AppliSerializer(temp, many=True).data)

	@appli_list.mapping.post
	def appli_list_post(self, requset, club_id):
		user=User.objects.get(id = requset.data['user_id'])
		club = Club.objects.get(id=club_id)
		if user in club.user_list.all():
			return Response(error_msg(2001), status=status.HTTP_403_FORBIDDEN)
		if user not in club.appli_list.all():
			return Response(error_msg(2002), status=status.HTTP_403_FORBIDDEN)

		# todo 이부분 함수로 만들어야하나?
		club.user_list.add(user)
		club.appli_list.remove(user)
		club.PlusUsernum()

		return Response(success_msg(1001))

	@appli_list.mapping.delete
	def appli_list_delete(self, request, club_id, pk=None):
		user_id = int(request.GET.get('user_id'))
		club = Club.objects.get(id = club_id)
		club.appli_list.remove(user_id)
		temp = Club.objects.get(id=club_id).appli_list.all()
		return Response(StaffSerializer(temp,many=True).data)
