"""gb_backend_ebs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from core import views as core_views

urlpatterns = [
    path('admin/', admin.site.urls), 
    path('', core_views.healthcheck), 
    path('create_listing/', core_views.create_listing), 
    path('get_listings/', core_views.get_listings), 
    path('search_listings/', core_views.search_listings), 
    path('submit_order/', core_views.submit_order), 
    path('get_orders_for_user/', core_views.get_orders_for_user), 
    path('edit_order/', core_views.edit_order), 
]