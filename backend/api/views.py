from rest_framework import viewsets, generics, filters, status
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .models import Product, ServiceInquiry, ContactInquiry, SiteSetting, Milestone, CoreValue, Project
from .serializers import (
    ProductSerializer, ServiceInquirySerializer, ContactInquirySerializer,
    SiteSettingSerializer, MilestoneSerializer, CoreValueSerializer, ProjectSerializer
)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public read-only ViewSet for browsing products.
    Supports list and retrieve (by slug).
    Filter by category via ?category=DOMESTIC query param.
    """
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at', 'name']

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class ServiceInquiryCreateView(generics.CreateAPIView):
    """
    POST-only endpoint for submitting service inquiries.
    """
    queryset = ServiceInquiry.objects.all()
    serializer_class = ServiceInquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                'message': 'Service inquiry submitted successfully. We will contact you soon!',
                'data': serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )


class ContactInquiryCreateView(generics.CreateAPIView):
    """
    POST-only endpoint for submitting contact form inquiries.
    """
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                'message': 'Thank you for reaching out! We will get back to you shortly.',
                'data': serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )


class SiteSettingRetrieveView(generics.RetrieveAPIView):
    """
    Returns the singleton SiteSetting object.
    """
    serializer_class = SiteSettingSerializer

    @method_decorator(cache_page(60 * 60 * 2))
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def get_object(self):
        obj, created = SiteSetting.objects.get_or_create(pk=1)
        return obj


class MilestoneViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Returns all milestones.
    """
    queryset = Milestone.objects.all()
    serializer_class = MilestoneSerializer

    @method_decorator(cache_page(60 * 60 * 2))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


class CoreValueViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Returns all core values.
    """
    queryset = CoreValue.objects.all()
    serializer_class = CoreValueSerializer

    @method_decorator(cache_page(60 * 60 * 2))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public read-only ViewSet for browsing past work projects.
    """
    queryset = Project.objects.filter(is_active=True).prefetch_related('images')
    serializer_class = ProjectSerializer
    lookup_field = 'slug'

