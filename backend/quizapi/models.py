from django.conf import settings
from django.db import models


class Score(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="scores"
    )
    topic = models.CharField(max_length=100)
    score = models.PositiveIntegerField()
    total_questions = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.user.username} - {self.topic}: {self.score}/{self.total_questions}"
