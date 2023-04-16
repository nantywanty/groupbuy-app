from . import models
from rest_framework import serializers
# from rest_framework.fields import CharField, EmailField


# class GBuserSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = models.GBuser
# 		fields = '__all__'

class ListingSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Listing
		fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.Order
		fields = '__all__'