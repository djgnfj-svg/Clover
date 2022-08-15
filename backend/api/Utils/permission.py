from rest_framework import permissions

from club.models import Club

class IsMeneger(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return obj.user == request.user

	def has_permission(self, request, view):
		club_id = int(view.kwargs['club_id'])
		obj = Club.objects.get(id = club_id)
		if request.user in obj.managerlist.all():
			return True
		return False
	
class IsMaster(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return obj.user == request.user

	def has_permission(self, request, view):
		club_id = int(view.kwargs['club_id'])
		obj = Club.objects.get(id = club_id)
		if request.user == obj.master:
			return True
		return False
	