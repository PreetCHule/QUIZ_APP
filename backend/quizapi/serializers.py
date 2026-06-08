from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Score


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username",)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data["username"])
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()

    def validate(self, attrs):
        username = attrs.get("username")
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "Invalid username. Say Register to create a new account or Login to try again."
            )
        attrs["user"] = user
        return attrs


class ScoreSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Score
        fields = (
            "id",
            "username",
            "topic",
            "score",
            "total_questions",
            "created_at",
        )
