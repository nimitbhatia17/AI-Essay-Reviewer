from django.db import models
import uuid


class Essay(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=2047)
    essay = models.CharField()
    authors = models.CharField(max_length=255)
    source_url = models.URLField(max_length=511)
    thumbnail_url = models.URLField(max_length=511)
