from .models import Profile,new_inventory

def user_profile(request):
    try:
        Users = Profile.objects.order_by('user')

        AllUsers = []
        for UsersIndex in Users:
            # print(UsersIndex.id)
            # Allinventory = new_inventory.objects.filter(inventor_id_id = UsersIndex.id)
            # print(Allinventory)
            # print(len(Allinventory))
            UserInfo = {
                'id' : UsersIndex.user_id,
                'FirstName' : UsersIndex.user.first_name,
                'LastName' : UsersIndex.user.last_name,
                'Position' : UsersIndex.position,
                'PersonnelNumber' : UsersIndex.personnel_number,
                'inventory_count' : len(new_inventory.objects.filter(inventor_id_id = UsersIndex.id)),
            }
            AllUsers.append(UserInfo)
        return locals()
    except:
        pass
    #return locals()
