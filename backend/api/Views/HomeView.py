from django.core import serializers

from rest_framework import viewsets, status
from rest_framework.response import Response

from api.Utils.Error_msg import error_msg

from club.models import Club

class HomeViewSet(viewsets.ViewSet):
	def list(self, request):
		queryset = Club.objects.all().order_by("-created_at")
		if not queryset:
			return Response(error_msg(404), status=status.HTTP_200_OK)
		rtn = serializers.serialize('json', queryset)
		return Response(rtn, status=status.HTTP_200_OK)
