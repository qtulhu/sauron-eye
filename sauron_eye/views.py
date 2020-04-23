from django.shortcuts import render
from django.contrib.auth.models import User
from django.conf import settings
from django.http import HttpResponse , HttpResponseRedirect
from django.utils import timezone
import json
import os
from .models import *
from .forms import *
tz = timezone.get_default_timezone()
from django.conf import settings
import base64
from django.core.files import File
from django.core.files.base import ContentFile

# def ShowAllUsers():
#     Users = Profile.objects.order_by('user')
#     AllUsers = []
#     for UsersIndex in Users:
#         UserInfo = {
#             'id' : UsersIndex.user_id,
#             'FirstName' : UsersIndex.user.first_name,
#             'LastName' : UsersIndex.user.last_name,
#             'Position' : UsersIndex.position,
#             'PersonnelNumber' : UsersIndex.personnel_number,
#         }
#         AllUsers.append(UserInfo)
#     return(AllUsers)

def make_list(count):
    list =[]
    for index in range(0,count):
        list.append('true')
    for index in range(0,(5 - count)):
        list.append('false')
    return(list)

def avg_rating(id):
    defects = defect.objects.filter(ninv_id = id)
    defects_count = len(defects)
    if defects_count > 0:
        sum = 0
        for defect_index in defects:
            sum = sum + defect_index.rating
        return(sum/defects_count)
    else:
        return(0)

def ShowInventorian(all,id):
    if all:
        Inventorian = new_inventory.objects.all()
    else:
        inventor = Profile.objects.get(user_id = id)
        Inventorian = new_inventory.objects.filter(inventor_id = inventor.id)
    AllInventorian = []
    for InventorianIndex in Inventorian:
        InventorianCreateTime = InventorianIndex.created_time.astimezone(tz).strftime('%d.%m.%Y %H:%M')
        InventorianInfo = {
        'id' : InventorianIndex.new_inv_id,
        'adr' : InventorianIndex.adr,
        'floor_count' : InventorianIndex.floor_count,
        'porch_count' : InventorianIndex.porch_count,
        'apartament_count' : InventorianIndex.apartament_count,
        'tech_type' : InventorianIndex.tech_type,
        'photo' : InventorianIndex.main_photo,
        'created_time' : InventorianCreateTime,
        'status' : InventorianIndex.new_status,
        'inventor_id' : InventorianIndex.inventor_id.user_id,
        'avg_rating' : avg_rating(InventorianIndex.new_inv_id),
        }
        AllInventorian.append(InventorianInfo)

    return(AllInventorian)


def CheckAdrInfo(adr):
    try:
        street = adr[1].replace('Улица ','').replace(' Улица','').replace('улица ','').replace(' улица','')
        house = adr[2]

        result = addres.objects.filter(street__contains=street).filter(house__contains=house)

        count_list = {
            'floor_count' : result[0].floor_count,
            'porch_count' : result[0].porch_count,
            'apartament_count' : result[0].apartament_count,
            'no_info' : 'false',
        }
        count_list = json.dumps(count_list,sort_keys = True, indent = 4)
        return count_list
    except:
        count_list = {
            'floor_count' : 0,
            'porch_count' : 0,
            'apartament_count' : 0,
            'no_info' : 'true',
        }
        count_list = json.dumps(count_list,sort_keys = True, indent = 4)
        return count_list

def index(request):
    return render(
        request,
        'index.html',
        {
        'Inventorian_info' : ShowInventorian(True,'0')
        },
    )

def filter(request):
    return render(
        request,
        'index.html',
        {
        'Inventorian_info' : ShowInventorian(False,request.GET['inventor_id'])
        },
    )

def edit(request):
    IdForEdit = request.GET['id']
    InfoForEdit = new_inventory.objects.get(new_inv_id = IdForEdit)
    name = InfoForEdit.inventor_id.user.first_name + ' ' + InfoForEdit.inventor_id.user.last_name + ' (т.н. ' + str(InfoForEdit.inventor_id.personnel_number) + ')'
    detail_info = {
        'id' : InfoForEdit.new_inv_id,
        'adr' : InfoForEdit.adr,
        'floor_count' : InfoForEdit.floor_count,
        'porch_count' : InfoForEdit.porch_count,
        'apartament_count' : InfoForEdit.apartament_count,
        'tech_type' : InfoForEdit.tech_type.replace('kro','КРО').replace('ork','ОРК').replace('or','ОР'),
        'created_time' : InfoForEdit.created_time.astimezone(tz).strftime('%d.%m.%Y %H:%M'),
        'inventor_name' : name
    }
    if (InfoForEdit.porch_count != 0):
        show_porch = 'true'
        count = []
        for index in range (1,InfoForEdit.porch_count+1):
            count.append(index)

    else:
        count = []
        show_porch = 'false'

    return render(
        request,
        'edit.html',
        {
        'Info' : detail_info,
        'show' : show_porch,
        'counter' : count
        },
    )

def base_check(request):
    adr = str(request.GET['adr']).replace('Россия, ','').split(', ')
    return HttpResponse(CheckAdrInfo(adr))

def create(request):
    data = request.POST

    try:
        files = request.FILES
        photo = (files['photo'])
        print(files['photo'])
        print(type(files['photo']))
    except:
        photo = 'blank'
        print(photo)
        print(type(photo))

    new_inventory.objects.create(
        adr=data['adr'],
        floor_count=data['floor'],
        porch_count = data['porch'],
        apartament_count = data['apart'],
        tech_type = data['techType'],
        main_photo = photo,
        inventor_id_id = Profile.objects.get(user_id = data['inventor_id']).id
        )

    return HttpResponse('all ok 200')

def delete(request):
    InventryIdForRemove = request.GET['id']
    new_inventory.objects.get(new_inv_id = InventryIdForRemove).delete()

    return HttpResponseRedirect('/')

def detail(request):
    notes = [
    '1 технология (патчкорд сварен с волокном DROP кабеля)',
    '2 технология (патчкорды подключены через опт. розетку)',
    '3 технология (патчкорды подключены через сплиттер)',
    'КРО установлены в нише',
    'КРО установлена на стене',
    'Нет крышки или кожуха на коробках (ОРК)',
    'Необходима замена коробки',
    'Отсутствует маркировка коробки/логотип',
    'Отсутствует маркировка патчкордов',
    'Запас волокон не уложен, или не уложены гильзы в ложементы, или не закреплен оптический разветвитель',
    'Крышка коробки не закрывается',
    'Отсутствует кабель-канал, необходим монтаж',
    'Кабель-канал не закреплен монтаж',
    'Патчкорд не уложен в кабель-канал',
    'Нет крышки на коробке или не закрывается',
    'Ввод в квартиру не защищён',
    'Межэтажный переход по слаботочным нишам',
    'Межэтажный переход по построенным стоякам',
    'ПНД труба, указать размер',
    'Короб (материал), указать размер',
    'Дефект в креплении межэтажного стояка',
    'Крышка короба не закрывается',
    'Крышка короба отсутствует',
    'Труба ПНД сломана',
    ]

    inventory = new_inventory.objects.get(new_inv_id = request.GET['id'])

    name = inventory.inventor_id.user.first_name + ' ' + inventory.inventor_id.user.last_name + ' (т.н. ' + str(inventory.inventor_id.personnel_number) + ')'
    info_about_inventory = {
        'id' : inventory.new_inv_id,
        'adr' : inventory.adr,
        'floor_count' : inventory.floor_count,
        'porch_count' : inventory.porch_count,
        'apartament_count' : inventory.apartament_count,
        'tech_type' : inventory.tech_type.replace('kro','КРО').replace('ork','ОРК').replace('or','ОР'),
        'created_time' : inventory.created_time.astimezone(tz).strftime('%d.%m.%Y %H:%M'),
        'inventor_name' : name
    }

    defect_list = defect.objects.filter(ninv_id = request.GET['id'])
    all_defects = []
    for defect_index in defect_list:
        make_list(defect_index.rating)
        checkbox_info = {
            'name' : notes[defect_index.checkbox-1],
            'comment' : defect_index.comment,
            'rate' : make_list(defect_index.rating),
            'porch' : defect_index.porch,
            'url' : defect_index.photo.url,
        }
        all_defects.append(checkbox_info)

    return render(
        request,
        'detail.html',
        {
            'Info' : info_about_inventory,
            'defects' : all_defects,
        },
    )

def confirm_edit(request):
    data_1 = request.POST
    data = data_1.copy()
    inv_for_edit = new_inventory.objects.get(new_inv_id=data['id'])
    mas = ['floor_count','porch_count','apartament_count','inventor_id_id','tech_type']

    if (data['inventor_id_id'] != ''):
        inv_id = Profile.objects.get(user_id = data['inventor_id_id']).id
        data['inventor_id_id'] = inv_id
        user = inv_for_edit.inventor_id_id

    for index in mas:
        if (data[index] != ''):
            evality = eval('inv_for_edit.'+index)
            if ((evality != data[index]) and (data[index] != '0')):
                if ((index == 'floor_count') or (index == 'porch_count') or (index == 'apartament_count') or (index == 'inventor_id_id')):
                    count = int(data[index])
                    exec('inv_for_edit.%s = %i' % (index,count))
                    inv_for_edit.save()
                else:
                    exec('inv_for_edit.%s = data[index]' %index)
                    inv_for_edit.save()
    return HttpResponse('all ok 200')

def push_porch_info_to_base(request):
    id = request.POST['id']

    inv_for_push_porch_info = new_inventory.objects.get(new_inv_id=id)
    data = json.loads(request.POST['json_house_info'])

    for defects in data:
        encodedPhoto = defects['photo'].replace('data:image/jpeg;base64,','')
        try:
            photo_name = 'p'+defects['porch']+'id'+defects['id']+'.jpg'
            decodedPhoto = base64.urlsafe_b64decode(encodedPhoto)
            finalPhoto = ContentFile(decodedPhoto, name=photo_name)
        except:
            finalPhoto = 'blank'

        obj, created = defect.objects.get_or_create(ninv_id=inv_for_push_porch_info,
                                                    checkbox=defects['id'],
                                                    porch=defects['porch'],
                                                    )
        if created:
        # если не было записи и она создалась тут можно что то еще добавить
            obj.photo = finalPhoto
            obj.comment = defects['comment']
            obj.rating = defects['rating']
            obj.save()
        else:
            root = os.path.join(settings.MEDIA_ROOT,obj.photo.name)
            try:
                if finalPhoto == 'blank':
                    pass
                else:
                    os.remove(root)
                    obj.photo = finalPhoto
                    obj.comment = defects['comment']
                    obj.rating = defects['rating']
                    obj.save()
            except:
                pass
            # person just refers to the existing one
    inv_for_push_porch_info.new_status = False
    inv_for_push_porch_info.save()
    return HttpResponse('all ok 200')


def help(request):
    return render(
        request,
        'help.html',
    )
