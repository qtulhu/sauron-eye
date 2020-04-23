from django.contrib import admin
from .models  import *

# admin.site.register(main_inventory)
admin.site.register(defect)
# admin.site.register(logs_merge_commit)
# admin.site.register(User)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'position', 'personnel_number']

class AddresAdmin(admin.ModelAdmin):
    list_display = ['city', 'street', 'house', 'dop']

class NewInventoryAdmin(admin.ModelAdmin):
    list_display = ['adr', 'apartament_count', 'tech_type']

admin.site.register(Profile, ProfileAdmin)
admin.site.register(addres, AddresAdmin)
admin.site.register(new_inventory, NewInventoryAdmin)
