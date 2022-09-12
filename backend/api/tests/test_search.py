
import json
from rest_framework import status
from rest_framework.test import APITestCase

from accounts.models import User
from api.Serializers.ClubSerializer import ClubViewSerializer

from club.models import Club

# Create your tests here.

class SearchTestCase(APITestCase):
    def setUpclass(self) -> None:
        print("실행?")
    def setUp(self) -> None:
        self.username = "testcate1"
        self.email = "test@test.com"
        self.password1 = "test@0830"
        self.password2 = "test@0830"
        self.signup_url = "/api/accounts/"
        user = User.objects.create(username=self.username, email = self.email,
        password=self.password1)
        Club.objects.bulk_create(
            [Club(title="search_test1", creator = user, master = user,\
                days = ["Mon"],range_age = 'Over10', time_zone = '1', gender = 'M'),
            Club(title="search_test2", creator = user, master = user,\
                days = ["Mon", "The"], range_age = 'Over10', time_zone = '1', gender = 'M'),
            Club(title="search_test3", creator = user, master = user,\
                days = ["Wed"], range_age = 'Over10', time_zone = '1', gender = 'M'),
            Club(title="search_test4", creator = user, master = user,\
                days = ["Wed","Thu"], range_age = 'Over10', time_zone = '1', gender = 'M'),
            Club(title="search_test5", creator = user, master = user,\
                days = ["Thu","Fri",], range_age = 'Over10', time_zone = '1', gender = 'M'),
            Club(title="search_test6", creator = user, master = user,\
                days = ["Sat", "Sun"], range_age = 'Over10', time_zone = '1', gender = 'M'),
            Club(title="search_test7", creator = user, master = user,\
                days = [], range_age = 'Over10', time_zone = '1', gender = 'M'),
            Club(title="search_test8", creator = user, master = user,\
                days = [], range_age = 'Over10', time_zone = '1', gender = 'M')]
        )
        self.title = "1"
        self.days = ["Mon"]
        self.range_age = 'Over10'
        self.time_zone = '1'
        self.gender = 'W'
    def test_search_title(self):
        response = self.client.get("/api/search/?query={}".format(self.title))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        serialzier = ClubViewSerializer(Club.objects.filter(title__contains=self.title),many=True).data

        self.assertEqual(len(response_data), Club.objects.filter(title__contains=self.title).count())
        for i in range(len(response_data)):
            self.assertEqual(response_data[i]['id'], serialzier[i]['id'])

    def test_search_days(self):
        response = self.client.get("/api/search/?days[]=Mon")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response_data = json.loads(response.content)
        day = self.days[0]
        serialzier = ClubViewSerializer(Club.objects.filter(days__icontains=day),many=True).data

        self.assertEqual(len(response_data), Club.objects.filter(days__icontains=day).count())

        for i in range(len(response_data)):
            self.assertEqual(response_data[i]['id'], serialzier[i]['id'])

    def test_search_range_age(self):
        response = self.client.get("/api/search/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_search_time_zone(self):
        response = self.client.get("/api/search/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_search_gender(self):
        response = self.client.get("/api/search/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
