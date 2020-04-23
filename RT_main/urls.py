from django.contrib import admin
from django.urls import path

from django.urls import include

from django.views.generic import RedirectView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
path('admin/', admin.site.urls),
path('sauron_eye/', include('sauron_eye.urls')),
path('accounts/', include('django.contrib.auth.urls')),
path('favicon.ico', RedirectView.as_view(url='/static/img/favicon.ico', permanent=True)),
path('',RedirectView.as_view(url='/sauron_eye/', permanent=True)),] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


#/accounts/login
#path('',RedirectView.as_view(url='/sauron_eye/', permanent=True)),]


# urlpatterns += [
#     path('accounts/', include('django.contrib.auth.urls')),
# ]
