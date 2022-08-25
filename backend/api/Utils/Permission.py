from django.shortcuts import get_object_or_404

from rest_framework import permissions, exceptions

from club.models import Club

class IsManager(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return obj.user == request.user

	def has_permission(self, request, view):
		club_id = int(view.kwargs['club_id'])
		obj = get_object_or_404(Club, id = club_id)
		if request.user in obj.managerlist.all() or\
			request.user == obj.master:
			return True
		return False
	
class IsMaster(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return obj.master == request.user

	def has_permission(self, request, view,):
		try :
			club_id = view.kwargs['pk']
		except KeyError:
			try :
				club_id = int(view.kwargs['club_id'])
			except:
				raise exceptions.PermissionDenied("권한이 없습니다.")
		obj = get_object_or_404(Club, id = club_id)
		if request.user == obj.master:
			return True
		return False
	