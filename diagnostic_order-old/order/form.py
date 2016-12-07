from django import forms
 
class AddForm(forms.Form):
  Id = forms.CharField(label='Id')
  Date = forms.DateTimeField(default=datetime.now, label='Date')
  Subject = forms.CharField(label='Subject')
  Source = form.URLField(label='Source')
  Target = form.URLField(label="Target")
  Reason = form.CharField(label='Reason')
  When = form.CharField(lable='When')
  Code = form.CharField(lable='Code')
  Schedule = form.CharField(lable='Schedule')
  Detail = form.URLField(lable='Detail')



