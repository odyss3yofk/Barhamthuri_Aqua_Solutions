from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='product')
router.register(r'milestones', views.MilestoneViewSet, basename='milestone')
router.register(r'values', views.CoreValueViewSet, basename='corevalue')

urlpatterns = [
    path('', include(router.urls)),
    path('settings/', views.SiteSettingRetrieveView.as_view(), name='site-settings'),
    path('service-inquiry/', views.ServiceInquiryCreateView.as_view(), name='service-inquiry'),
    path('contact/', views.ContactInquiryCreateView.as_view(), name='contact-inquiry'),
]
