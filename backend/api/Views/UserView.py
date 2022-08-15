from django.http import HttpResponseRedirect
from rest_framework import viewsets, status
from rest_framework.views import APIView

from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC

from rest_framework import viewsets, status
from rest_framework.response import Response
from dj_rest_auth.registration.views import RegisterView

from api.Serializers.userSerializer import UserPofileSerializer
from accounts.models import UserProfile
from api.Utils.error_msg import error_msg

class ConfirmEmailView(APIView):
    def get(self, *args, **kwargs):
        self.object = confirmation = self.get_object()
        confirmation.confirm(self.request)
        # A React Router Route will handle the failure scenario
        return HttpResponseRedirect('/') # 인증성공

    def get_object(self, queryset=None):
        key = self.kwargs['key']
        email_confirmation = EmailConfirmationHMAC.from_key(key)
        if not email_confirmation:
            if queryset is None:
                queryset = self.get_queryset()
            try:
                email_confirmation = queryset.get(key=key.lower())
            except EmailConfirmation.DoesNotExist:
                # A React Router Route will handle the failure scenario
                return HttpResponseRedirect('/') # 인증실패
        return email_confirmation

    def get_queryset(self):
        qs = EmailConfirmation.objects.all_valid()
        qs = qs.select_related("email_address__user")
        return qs

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserPofileSerializer
    queryset = UserProfile.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = UserProfile.objects.filter(user = request.user.id)
        if not queryset:
            return Response(error_msg(404), status=status.HTTP_200_OK)
        serializer = self.get_serializer_class()
        rtn = serializer(queryset, many=True)
        return Response(rtn.data, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)