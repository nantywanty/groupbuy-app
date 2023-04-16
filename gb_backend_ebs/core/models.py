from django.db import models
import datetime

# Create your models here.
class Listing(models.Model):
    choices = [
        ('open', 'open'), 
        ('closed', 'closed'), 
        ('order_placed', 'order_placed'), 
        ('order_received', 'order_received'), 
        ('delivered', 'delivered'), 
        ('cancelled', 'cancelled')
        ]
    
    listing_id = models.AutoField(primary_key=True)
    listing_owner = models.CharField(max_length=254)
    listing_name = models.CharField(max_length=254)
    listing_image_url = models.CharField(max_length=254)
    listing_cloudfront_url = models.CharField(max_length=254)
    listing_description = models.CharField(max_length=254)
    listing_unit_price = models.FloatField()
    listing_max_quantity = models.PositiveIntegerField()
    listing_remaining_quantity = models.PositiveIntegerField()
    # start_date = models.DateField()
    listing_end_date = models.DateField()
    listing_delivery_date = models.DateField()
    listing_status = models.CharField(max_length=254, choices=choices)
    listing_created_at = models.DateTimeField(auto_now_add=True)
    listing_updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = "listing"
        verbose_name_plural = "listings"

class Order(models.Model):
    choices = [
        ('placed', 'placed'), 
        ('closed', 'closed'), 
        ('order_placed', 'order_placed'), 
        ('order_received', 'order_received'), 
        ('delivered', 'delivered'), 
        ('cancelled', 'cancelled'), 
        ('seller_cancelled', 'seller_cancelled')
        ]
    
    order_id = models.AutoField(primary_key=True)
    order_owner = models.CharField(max_length=254)
    order_listing_id = models.IntegerField()
    order_quantity = models.PositiveIntegerField()
    order_unit_price = models.FloatField()
    order_total_amount = models.FloatField()
    order_contact_details = models.CharField(max_length=254)
    order_address = models.CharField(max_length=254)
    order_postal_code = models.CharField(max_length=254)
    order_status = models.CharField(max_length=254, choices=choices)
    order_created_at = models.DateTimeField(auto_now_add=True)
    order_updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "order"
        verbose_name_plural = "orders"