from django.http import HttpResponseRedirect

from rest_framework import viewsets, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC

from api.Utils.Error_msg import error_msg
from api.Serializers.UserSerializer import UserPofileSerializer

from accounts.models import UserProfile

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

class UserProfileViewSet(viewsets.GenericViewSet, mixins.RetrieveModelMixin,
            mixins.UpdateModelMixin, mixins.ListModelMixin):
    serializer_class = UserPofileSerializer
    queryset = UserProfile.objects.all()
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = UserProfile.objects.filter(user = request.user.id)
        if not queryset:
            return Response(error_msg(404))
        rtn = self.get_serializer(queryset, many=True, context = {'request' : request})
        return Response(rtn.data)