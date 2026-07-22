from rest_framework import serializers
from .models import Product, ServiceInquiry, ContactInquiry, SiteSetting, Milestone, CoreValue, Project, ProjectImage


class ProductSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'category_display',
            'description', 'specifications', 'price', 'image',
            'is_active', 'created_at',
        ]


class ServiceInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceInquiry
        fields = [
            'id', 'customer_name', 'phone_number', 'email',
            'service_type', 'message', 'preferred_date', 'created_at',
        ]
        read_only_fields = ['id', 'created_at']


class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = [
            'id', 'name', 'email', 'phone', 'subject', 'message', 'created_at',
        ]
        read_only_fields = ['id', 'created_at']


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = '__all__'


class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = '__all__'


class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = '__all__'


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'order']


class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    image_count = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'subtitle', 'description', 'cover_image', 'images', 'image_count', 'order', 'is_active']

    def get_image_count(self, obj):
        return obj.images.count()

