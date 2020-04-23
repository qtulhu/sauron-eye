from django.urls import path, include
from . import views

app_name='sauron_eye'

urlpatterns = [
    path('', views.index, name='index'),
    path('filter', views.filter, name='filter'),
    path('edit', views.edit, name='edit'),
    path('help', views.help, name='help'),
    path('base_check', views.base_check, name='base_check'),
    path('create', views.create, name='create'),
    path('delete', views.delete, name='delete'),
    path('detail', views.detail, name='detail'),
    path('confirm_edit', views.confirm_edit, name='confirm_edit'),
    path('push_porch_info_to_base', views.push_porch_info_to_base, name='push_porch_info_to_base'),

#    path('login/', VS.LoginView.as_view(), name='login'),

]
