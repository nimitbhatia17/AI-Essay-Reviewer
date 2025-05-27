from django.urls import path
from .views import SearchBasedOnTags

urlpatterns = [
    path('essays/search/', SearchBasedOnTags.as_view())
]
