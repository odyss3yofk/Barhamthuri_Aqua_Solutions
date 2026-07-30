from django.contrib import admin
from .models import Product, ServiceInquiry, ContactInquiry, SiteSetting, Milestone, CoreValue, Project, ProjectImage


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_bestseller', 'is_active', 'created_at')
    list_editable = ('price', 'is_bestseller', 'is_active')
    list_filter = ('category', 'is_bestseller', 'is_active', 'created_at')
    search_fields = ('name', 'description', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at',)
    list_per_page = 25


@admin.register(ServiceInquiry)
class ServiceInquiryAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'phone_number', 'service_type', 'preferred_date', 'is_resolved', 'created_at')
    list_editable = ('is_resolved',)
    list_filter = ('service_type', 'is_resolved', 'created_at')
    search_fields = ('customer_name', 'phone_number', 'email', 'message')
    readonly_fields = ('created_at',)
    list_per_page = 25


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'phone', 'subject', 'message')
    readonly_fields = ('created_at',)
    list_per_page = 25


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Only allow one instance
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)


@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    list_display = ('year', 'title', 'order')
    list_editable = ('order',)
    ordering = ('order', 'year')


@admin.register(CoreValue)
class CoreValueAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)
    search_fields = ('title', 'description')
    list_per_page = 25


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'is_active', 'order', 'created_at')
    list_editable = ('is_active', 'order')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectImageInline]
    search_fields = ('title', 'description', 'subtitle')
    list_filter = ('is_active', 'created_at')
    list_per_page = 25
