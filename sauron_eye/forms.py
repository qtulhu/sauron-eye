from django import forms

# from django.contrib.auth.models import User
# from .models import Profile
# from django.contrib.auth import get_user_model
#
# class UserRegistrationForm(forms.ModelForm):
#     password = forms.CharField(label='Password', widget=forms.PasswordInput)
#     password2 = forms.CharField(label='Repeat password', widget=forms.PasswordInput)
#
#     class Meta:
#         model = User
#         fields = ('username', 'first_name', 'email')
#
#     def clean_password2(self):
#         cd = self.cleaned_data
#         if cd['password'] != cd['password2']:
#             raise forms.ValidationError('Passwords don\'t match.')
#         return cd['password2']



class DateInput(forms.DateInput):
    input_type = 'date'
class TimeInput(forms.TimeInput):
    input_type = 'time'



class ExampleForm(forms.Form):
    my_date_field = forms.DateField(widget=DateInput)
    my_time_field = forms.DateField(widget=TimeInput)

class ExampleModelForm(forms.Form):
    class Meta:
        widget = {'my_date_field' : DateInput}
