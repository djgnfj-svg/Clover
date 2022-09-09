from django.test import TestCase
from accounts.models import User

from club.models import Club

# Create your tests here.

class testClubModel(TestCase):
    def setUp(self) -> None:
        self.username = "testcate1"
        self.email = "test@test.com"
        self.password1 = "test@0830"
        self.password2 = "test@0830"
        self.signup_url = "/api/accounts/"
        user = User.objects.create(username=self.username, email = self.email,
        password=self.password1)
        Club.objects.create(title = "test1", creator = user, master = user)
    
    def test_clubmodel_create(self):
        #유저 넣기
        user = User.objects.get(id = 1)
        club = Club.objects.create(title = "test2", creator = user, master = user)
    
    def test_clubmodel_update(self):
        change_title = "change_title"
        club = Club.objects.get(id = 1)
        self.assertEqual(club.title, "test1")
        club.title = change_title
        club.save()
        self.assertEqual(club.title, "change_title")