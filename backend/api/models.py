from django.db import models


class Category(models.TextChoices):
    DOMESTIC = 'DOMESTIC', 'Domestic Purifiers'
    INDUSTRIAL = 'INDUSTRIAL', 'Industrial RO Systems'
    CHIMNEY = 'CHIMNEY', 'Kitchen Chimneys'
    SPARES = 'SPARES', 'Spare Parts'


class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=50, choices=Category.choices)
    description = models.TextField()
    specifications = models.TextField(blank=True, help_text="Technical specifications (can use bullet points or free text)")
    price = models.CharField(max_length=100, null=True, blank=True, help_text="Can be exact price or range (e.g., '35000-300000')")
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class ServiceType(models.TextChoices):
    REPAIR = 'REPAIR', 'Repair'
    CHECKUP = 'CHECKUP', 'Routine Check-up'
    INSTALLATION = 'INSTALLATION', 'Installation'


class ServiceInquiry(models.Model):
    customer_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    service_type = models.CharField(max_length=50, choices=ServiceType.choices)
    message = models.TextField(help_text="Details of the issue or requirement")
    preferred_date = models.DateField(null=True, blank=True)
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Service Inquiries'

    def __str__(self):
        return f"{self.service_type} inquiry from {self.customer_name}"


class ContactInquiry(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Contact Inquiries'

    def __str__(self):
        return f"Inquiry from {self.name}: {self.subject}"


class SiteSetting(models.Model):
    # Singleton model
    hero_headline = models.CharField(max_length=255, default="Pure Water, Pure Life")
    hero_subheadline = models.TextField(default="Assam's most trusted water purification company. From homes to industries, we deliver clean, safe water solutions with expert service.")
    about_mission = models.TextField(default="Providing safe, clean drinking water to every household and industry in North East India through affordable, reliable water purification technology.")
    about_vision = models.TextField(default="To become the most trusted water solutions brand in North East India, ensuring no family has to compromise on water quality due to cost or availability.")
    about_story = models.TextField(default="Barhamthuri Aqua Solutions was founded in 2014 in Guwahati, Assam, with a simple yet powerful mission...")
    contact_address = models.TextField(default="Ward-4, Bihpuria, Lakhimpur, Assam 784161, India")
    contact_phone = models.CharField(max_length=50, default="+91 8753953744")
    contact_email = models.EmailField(default="barhamthuriaquasolutions@gmail.com")
    whatsapp_number = models.CharField(max_length=50, default="918753953744", help_text="Number only, with country code (e.g. 918753953744)")
    facebook_link = models.URLField(blank=True, null=True)
    instagram_link = models.URLField(blank=True, null=True)
    youtube_link = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name_plural = "Site Settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SiteSetting, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass

    def __str__(self):
        return "Global Site Settings"


class Milestone(models.Model):
    year = models.CharField(max_length=10)
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'year']

    def __str__(self):
        return f"{self.year} - {self.title}"


class CoreValue(models.Model):
    icon = models.CharField(max_length=50, help_text="Emoji or icon class")
    title = models.CharField(max_length=255)
    description = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Project(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    subtitle = models.CharField(max_length=100, help_text="e.g. Industrial, Community, Residential")
    description = models.TextField()
    cover_image = models.ImageField(upload_to='projects/covers/')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=255, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Image for {self.project.title}"


