
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=255, min_length=3,allow_blank=True)
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'updated_at')

    def validate_title(self, value):
        if value.strip() == "":
            raise serializers.ValidationError("El título no puede estar vacío.")
        return value
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )

    