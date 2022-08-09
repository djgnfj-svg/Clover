from rest_framework import routers

from api.Views.clubViewsets import ClubViewSet
from api.Views.userViewSet import UserProfileViewSet

router = routers.DefaultRouter()
router.register(r'club', ClubViewSet, basename="Club")
router.register(r'profile', UserProfileViewSet, basename="profile")
# router.register(r'search', SearchViewSet, basename="search")