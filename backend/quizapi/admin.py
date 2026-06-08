from django.contrib import admin

from .models import Score


@admin.register(Score)
class ScoreAdmin(admin.ModelAdmin):
    list_display = ("user", "topic", "score", "total_questions", "created_at")
    list_filter = ("topic", "created_at")
    search_fields = ("user__username", "topic")
