from django.shortcuts import render
from django.db import transaction
from rest_framework.response import Response

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

# from PIL import Image
import uuid
import json
import boto3

from .models import *
from .serializers import *


# python manage.py reset_db
# rm -rd your_app/migrations/* 

region = "us-east-1"
s3_base_url = "https://gb-storage-bucket-prod.s3.amazonaws.com/"
cloudfront_base_url = "https://d1e1rguvi10ykv.cloudfront.net/"

#Create your views here.
@api_view(['GET'])
def healthcheck(request):
    return(Response({}, status=status.HTTP_200_OK))
    if request.method == "POST":
        data = JSONParser().parse(request)
        print(data)
    else:
        print('received ping')
    return(Response({}))

@api_view(['POST'])
def create_listing(request):

    # get image, stuff like this
    # request.FILES["image"], request.POST["json"]

    # data = json.loads(request.POST["json"])

    s3 = boto3.client("s3")
    s3_image_name = str(uuid.uuid4()) + ".jpg"
    while True:
        try:
            s3.get_object(Bucket="gb-storage-bucket-prod", Key=s3_image_name)
            s3_image_name = str(uuid.uuid4()) + ".jpg"
        except:
            s3_upload = s3.put_object(Bucket="gb-storage-bucket-prod", Key=s3_image_name, Body=request.FILES["image"], ContentType='image/jpg')
            s3_acl = s3.put_object_acl(ACL="public-read", Bucket="gb-storage-bucket-prod", Key=s3_image_name)
            break

    try:
        with transaction.atomic():
            record = Listing(
                listing_owner = request.POST["listing_owner"], 
                listing_name = request.POST["listing_name"], 
                listing_image_url = s3_base_url + s3_image_name, 
                listing_cloudfront_url = cloudfront_base_url + s3_image_name, 
                listing_description = request.POST["listing_description"], 
                listing_unit_price = request.POST["listing_unit_price"], 
                listing_max_quantity = request.POST["listing_max_quantity"], 
                listing_remaining_quantity = request.POST["listing_remaining_quantity"], 
                # start_date = data["listing_start_date"], 
                listing_end_date = request.POST["listing_end_date"], 
                listing_delivery_date = request.POST["listing_delivery_date"], 
                listing_status = "open"
            ).save()

        return(Response({"api_execution":"success", "api_info":"Created listing successfully"}, status=status.HTTP_200_OK))
        
    except Exception as e:
        print(e)
        # transaction.set_rollback(True)
        return(Response("Invalid request", status=status.HTTP_400_BAD_REQUEST))

@api_view(['GET'])
def get_listings(request):
    
    try:
        serializer = ListingSerializer(Listing.objects.filter(listing_status="open"), many=True)
        resp = {
            "api_success":"success", 
            "api_execution":"success", 
            "api_info":"listings data retrieved successfully", 
            "listings_info":serializer.data
            }
        return(Response(resp, status=status.HTTP_200_OK))
    except Exception as e:
        print(e)
        return(Response('Invalid request', status=status.HTTP_400_BAD_REQUEST))

@api_view(['POST'])
def search_listings(request):

    data = JSONParser().parse(request)

    try:
        serializer = ListingSerializer(Listing.objects.filter(listing_description__icontains=data["search_query"], listing_status='open'), many=True)
        resp = {
            "api_success":"success", 
            "api_execution":"success", 
            "api_info":"listings search by query retrieved successfully", 
            "search_info":serializer.data
            }
        return(Response(resp, status=status.HTTP_200_OK))
    except Exception as e:
        print(e)
        return(Response('Invalid request', status=status.HTTP_400_BAD_REQUEST))

@api_view(['POST'])
def submit_order(request):
    #parse payload into json format
    data = JSONParser().parse(request)
    
    try:
        listing_id = data["listing_id"]
        order_quantity = data["order_quantity"]
        listing = Listing.objects.get(listing_id=listing_id)
        if (listing.listing_remaining_quantity >= order_quantity):
            with transaction.atomic():
                listing = Listing.objects.select_for_update().get(listing_id=listing_id)
            
                total_amount = round(order_quantity * listing.listing_unit_price, 2)
                order = Order(
                    order_owner = data["order_owner"], 
                    order_listing_id = listing_id, 
                    order_quantity = order_quantity, 
                    order_unit_price = listing.listing_unit_price, 
                    order_total_amount = total_amount, 
                    order_contact_details = data["order_contact_details"], 
                    order_address = data["order_address"], 
                    order_postal_code = data["order_postal_code"], 
                    order_status = "placed"
                ).save()
                listing.listing_remaining_quantity -= order_quantity
                listing.save()
            return(Response({"api_execution":"success", "api_info":"Order created successfully"}, status=status.HTTP_200_OK))
        else:
            return(Response({"api_execution":"fail", "api_info":"Order quantity greater than available quantity"}, status=status.HTTP_200_OK))

    except Exception as e:
        print(e)
        # transaction.set_rollback(True)
        return(Response('Invalid request', status=status.HTTP_400_BAD_REQUEST))

@api_view(['POST'])
def get_orders_for_user(request):

    data = JSONParser().parse(request)

    try:
        user_orders = Order.objects.filter(order_owner=data["order_owner"])
        associated_listings = Listing.objects.filter(listing_id__in=set(user_orders.values_list('order_listing_id', flat=True)))
        listing_serializer = ListingSerializer(associated_listings, many=True)
        order_serializer = OrderSerializer(user_orders, many=True)
        resp = {
            "api_success":"success", 
            "api_execution":"success", 
            "api_info":"user orders data retrieved successfully", 
            "user_orders_info":order_serializer.data, 
            "associated_listings_info":listing_serializer.data
            }
        return(Response(resp, status=status.HTTP_200_OK))
    except Exception as e:
        print(e)
        return(Response('Invalid request', status=status.HTTP_400_BAD_REQUEST))

@api_view(['POST'])
def edit_order(request):

    data = JSONParser().parse(request)

    try:
        if "order_status" in data:
            with transaction.atomic():
                order = Order.objects.select_for_update().get(order_id=data["order_id"])
                listing = Listing.objects.select_for_update().get(listing_id=order.order_listing_id)
                listing.listing_remaining_quantity += order.order_quantity
                order.order_status = 'cancelled'
                listing.save()
                order.save()
            resp = {
                "api_success":"success", 
                "api_execution":"success", 
                "api_info": f"cancelled order {data['order_id']} successfully"
                }
            return(Response(resp, status=status.HTTP_200_OK))
        else:
            with transaction.atomic():
                order = Order.objects.select_for_update().get(order_id=data["order_id"])
                listing = Listing.objects.select_for_update().get(listing_id=order.order_listing_id)
                listing.listing_remaining_quantity += order.order_quantity
                order.order_address = data["order_address"]
                order.order_postal_code = data["order_postal_code"]
                order.order_contact_details = data["order_contact_details"]
                order.order_quantity = data["order_quantity"]
                order.order_total_amount = round(data["order_quantity"] * listing.listing_unit_price, 2)
                listing.listing_remaining_quantity -= data["order_quantity"]
                listing.save()
                order.save()
            resp = {
                "api_success":"success", 
                "api_execution":"success", 
                "api_info": f"order {data['order_id']} edited successfully"
                }
            return(Response(resp, status=status.HTTP_200_OK))
        
    except Exception as e:
        print(e)
        return(Response('Invalid request', status=status.HTTP_400_BAD_REQUEST))

# @api_view(['POST'])
# def get_user(request):
#     #parse payload into json format
#     data = JSONParser().parse(request)
    
    
#     try:
#         #check if user email exists in database
#         email = data["user_email"]
#         try:
#             user = GBuser.objects.get(user_email=email)
#             serializer = GBuserSerializer(user)
#             resp = {"api_execution":"success"}
#             resp["user_info"] = serializer.data
#             return(Response(resp, status=status.HTTP_200_OK))
#         except:
#             return Response({
#                 "api_execution":"failed", 
#                 "api_info":f"Account does not exists for: {email}"
#                 }, status=status.HTTP_200_OK)
        
#         # user_info = json.dumps(model_to_dict(user), cls=DjangoJSONEncoder)
#         # user_info = {
#         #     "first_name":user.first_name, 
#         #     "last_name":user.last_name, 
#         #     "user_email":user.user_email
#         #     }
#         # resp = {
#         #     "api_success":"success", 
#         #     "api_execution":"success", 
#         #     "api_info":"user data retrieved successfully", 
#         #     "user_info":user_info
#         #     }
#         # return(JsonResponse(resp))
        
#     except:
#         return Response('Invalid request', status=status.HTTP_400_BAD_REQUEST)
#         # return(JsonResponse({
#         #     "api_success":"success", 
#         #     "api_execution":"failed", 
#         #     "api_info":"user does not exist"
#         #     }))

#     # except:
#     #     return(JsonResponse({"api_error":"error", "api_info":"Invalid request."}, status=400))

# {"listing_owner":"ywhdarius@gmail.com", "listing_name":"to be closed", "listing_description":"postman closing listing", "listing_unit_price": 12.50, "listing_max_quantity": 400, "listing_remaining_quantity": 400, "listing_end_date":"2023-03-31", "listing_delivery_date":"2023-05-05"}