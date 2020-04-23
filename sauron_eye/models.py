from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django.contrib.auth.models import AbstractUser
from django.conf import settings

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    position = models.TextField('Должность',max_length=100, blank=True)
    personnel_number = models.IntegerField('Табельный номер', blank=True)
    def __str__(self):
        return 'Profile for user {}'.format(self.user.username)
# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)
#
# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()


# class User(AbstractUser):
#     position = models.TextField('Должность',max_length=100, blank=True)
#     personnel_number = models.IntegerField('Табельный номер',null=True, blank=True)


class addres(models.Model):
    adr = models.CharField("адрес", primary_key = True , max_length=200)
    city = models.CharField("город" , max_length=100)
    street = models.CharField("улица" , max_length=100)
    house = models.CharField("дом" , max_length=100)
    dop = models.CharField("дополнительная инфа" , max_length=100)
    floor_count = models.IntegerField('количество этажей')
    porch_count = models.IntegerField('количество подъездов')
    apartament_count = models.IntegerField('количество квартир')
#    last_inventory = models.DateTimeField("Посдедняя инвенторизация")

    def __str__(self):
        return self.adr

class new_inventory(models.Model):
    new_inv_id = models.AutoField('айди новой инвенторизации' , primary_key=True)
    # addres = models.ForeignKey('addres', on_delete = models.DO_NOTHING)
    adr = models.CharField('адрес' , max_length=150,blank=True)
    floor_count = models.IntegerField('количество этажей',blank=True)
    porch_count = models.IntegerField('количество подъездов',blank=True)
    apartament_count = models.IntegerField('количество квартир',blank=True)
    main_photo = models.ImageField('фото', upload_to = '',blank=True)
    tech_type = models.CharField('тип подключения' , max_length=150,blank=True)
    num_of_device = models.IntegerField('количество устройтсв',blank=True,null=True)
    ports_count = models.IntegerField('количество портов',blank=True,null=True)
    unused_ports_count = models.IntegerField('количество свободных портов',blank=True,null=True)
    created_time = models.DateTimeField('Время',default=timezone.now)
    answers = models.TextField('Ответ',blank=True)
    new_status = models.BooleanField('статус новой инвенторизации',default = True)
    inventor_id = models.ForeignKey('Profile', on_delete = models.SET('deleted'))

    def __str__(self):
        return 'Inventory #{}'.format(self.new_inv_id)
        # return str(self.tech_type)

# class main_inventory(models.Model):
#     main_inv_id = models.AutoField('айди новой инвенторизации' , primary_key=True)
#     addres = models.ForeignKey('addres', on_delete = models.DO_NOTHING)
#     floor_count = models.IntegerField('количество этажей')
#     porch_count = models.IntegerField('количество подъездов')
#     apartament_count = models.IntegerField('количество квартир')
#     tech_type = models.CharField('тип подключения' , max_length=150)
#     num_of_device = models.IntegerField('количество устройтсв')
#     ports_count = models.IntegerField('количество портов')
#     unused_ports_count = models.IntegerField('количество свободных портов')
#
#     def __str__(self):
#         return 'Inventory #{}'.format(self.main_inv_id)
#         # return str(self.main_inv_id)

class defect(models.Model):
    ninv_id = models.ForeignKey('new_inventory', on_delete = models.CASCADE)
    dtm = models.DateTimeField('Дата и время',default=timezone.now)
    checkbox = models.IntegerField('деффет',blank=True,null=True)
    porch = models.IntegerField('подъезд',blank=True,null=True)
    #minv_id = ForeignKey('main_inventory', on_delete = models.DO_NOTHING)
    photo = models.ImageField('фото', upload_to = 'defects_photo',blank=True)
    rating = models.PositiveSmallIntegerField('оценка',blank=True,null=True)
    comment = models.TextField('Комментарий',blank=True,null=True)

    def __str__(self):
        return 'Defect for {}'.format(self.ninv_id)
        # return str(self.photo.name.replace('defects_photo/',''))

# class logs_merge_commit(models.Model):
#     merge_date_time = models.DateTimeField('Дата и время')
#     ninv_id = models.ForeignKey('new_inventory', on_delete = models.DO_NOTHING)
#     minv_id = models.ForeignKey('main_inventory', on_delete = models.DO_NOTHING)
#
#     def __str__(self):
#         return str(self.merge_date_time)
