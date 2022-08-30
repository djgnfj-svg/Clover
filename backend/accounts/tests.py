from django.test import TestCase, Client
from django.urls import reverse
# Create your tests here.

class AccountTest(TestCase):
    def setUp(self) -> None:
        self.test_url = "api/"
        self.register_url = "api/account/"
        return super().setUp()

    def test_list(self):
        c = Client()
        res = c.get("api/home/")
        print(res.status_code)
        self.assertEqual(res.status_code, 200)