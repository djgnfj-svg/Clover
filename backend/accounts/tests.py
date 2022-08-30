from django.test import TestCase

# Create your tests here.

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from accounts.models import User
# Create your tests here.

class testUserModel(TestCase):
    def setUp(self):
        self.username = "testcate1"
        self.email = "test@test.com"
        self.password1 = "test@0830"
        self.password2 = "test@0830"
        self.signup_url = "/api/accounts/"
        User.objects.create(username=self.username, email = self.email,
        password=self.password1)

    def test_label(self):
        user = User.objects.get(id=1)
        field_label = user._meta.get_field('username').verbose_name
        self.assertEquals(field_label, "username")


class testAccounts(APITestCase):
    def setUp(self):
        self.username = "testcate1"
        self.email = "test@test.com"
        self.password1 = "test@0830"
        self.password2 = "test@0830"
        self.signup_url = "/api/accounts/"
    def test_register(self):
        signup_data = {
            'username' : self.username,
            'email' : self.email,
            'password1' : self.password1,
            'password2' : self.password2
        }
        response = self.client.post(self.signup_url, signup_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    def test_register_have_same_email(self):

    def test_register_have_same_username(self):
    def test_register_un_same_password1_2(self):
    def test_login(self):
    def test_login_fail(self):