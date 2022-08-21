from rest_framework import viewsets, status
from rest_framework.response import Response

class SearchViewSet(viewsets.ViewSet):
	def list(self, request):
		range_age = request.GET.get('range_age',None)
		day = request.GET.get('day',None)
		time_zone = request.GET.get('time_zone',None)
		gender = request.GET.get('gender',None)
		
		return Response({'msg':"test"},status=status.HTTP_200_OK)