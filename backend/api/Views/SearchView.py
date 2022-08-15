from rest_framework import viewsets, status

from rest_framework.response import Response

class SearchViewSet(viewsets.ViewSet):
	def list(self, request):
		return Response({'msg':"test"},status=status.HTTP_200_OK)