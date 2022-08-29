from django.db.models import Q

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny

from api.Serializers.ClubSerializer import ClubViewSerializer

from club.models import Club

class HomePagination(PageNumberPagination):
	page_size = 12

class SearchViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Club.objects.all().order_by("-created_at")
	serializer_class = ClubViewSerializer
	pagination_class = HomePagination
	permission_classes = [AllowAny]

	def list(self, request):
		range_age = request.GET.get('range_age',None)
		days = request.GET.get('days',None)
		time_zone = request.GET.get('time_zone',None)
		gender = request.GET.get('gender',None)
		query = request.GET.get('query', None)
		q = Q()
		if days:
			day_list = days.split('+')
			for day in day_list:
				q &= Q(range_age=day)
		
		if range_age:
			q &= Q(range_age=range_age)
		if time_zone:
			q &= Q(time_zone=time_zone)
		if gender:
			q &= Q(gender=gender)
		if query:
			q &= Q(title__contains=query)
		rtn = Club.objects.filter(q)
		return Response(ClubViewSerializer(rtn,many=True,context = {'request' : request}).data)