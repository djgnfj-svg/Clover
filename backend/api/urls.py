from rest_framework import routers

from api.Views.clubViewsets import ClubViewSet, ClubManagerView
from api.Views.userViewSet import UserProfileViewSet
from api.Views.searchViewSets import SearchViewSet
from api.Views.homeViewset import HomeViewSet

router = routers.DefaultRouter()
router.register(r'club', ClubViewSet, basename="Club")
router.register(r'club/(?P<club_id>\d+)/manager', ClubManagerView, basename="ClubManager")
router.register(r'profile', UserProfileViewSet, basename="profile")
router.register(r'search', SearchViewSet, basename="search")
router.register(r'home', HomeViewSet, basename="Home")