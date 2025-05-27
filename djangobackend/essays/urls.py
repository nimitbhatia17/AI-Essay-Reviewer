from django.urls import path
from .views import SearchBasedOnTags, GetEssayBasedOnId

urlpatterns = [
    path('essays/search/', SearchBasedOnTags.as_view()),
    path('essay/get', GetEssayBasedOnId.as_view())
]
