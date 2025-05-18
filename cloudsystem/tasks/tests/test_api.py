import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from tasks.models import Task
from tasks.serializers import RegisterSerializer

@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def user(db):
    return User.objects.create_user(username="ana", password="Segura123")

@pytest.fixture
def token(client, user):
    res = client.post("/api/auth/", {"username": "ana", "password": "Segura123"})
    return res.data["access"]

def auth_client(client, token):
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    return client

def test_create_task(client, user, token):
    client = auth_client(client, token)
    res = client.post("/api/tasks/", {"title": "Tarea 1"})
    assert res.status_code == 201
    assert Task.objects.filter(user=user).count() == 1

def test_task_str_method(user):
    task = Task.objects.create(user=user, title="Test", description="")
    assert str(task) == "Test"

def test_invalid_title(client, token):
    client = auth_client(client, token)
    res = client.post("/api/tasks/", {"title": " "})
    assert res.status_code == 400

def test_empty_title_validation(client, token):
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    res = client.post("/api/tasks/", {"title": "   "})
    assert res.status_code == 400
    assert "título no puede estar vacío" in str(res.json()["title"][0]).lower()


def test_register_serializer_creates_user(db):
    data = {"username": "testuser", "password": "StrongPass123"}
    serializer = RegisterSerializer(data=data)
    assert serializer.is_valid()
    user = serializer.save()
    assert user.username == "testuser"
    assert user.check_password("StrongPass123")

def test_get_queryset_returns_only_user_tasks(client, user, token):
    other_user = User.objects.create_user(username="otro", password="12345678")
    Task.objects.create(user=user, title="Mi tarea")
    Task.objects.create(user=other_user, title="Tarea ajena")

    client = auth_client(client, token)
    res = client.get("/api/tasks/")
    assert len(res.json()) == 1

def test_register_user(db, client):
    res = client.post("/api/auth/register/", {
        "username": "nuevo",
        "password": "NuevaClave123"
    })
    assert res.status_code == 201
    assert User.objects.filter(username="nuevo").exists()
