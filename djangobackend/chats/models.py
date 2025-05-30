from django.db import models
from conversations.models import Conversation
import uuid


class Chat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    text = models.CharField(max_length=2000)
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE)
    previous_output_id = models.CharField(max_length=200, default=None)
    is_ai = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id
