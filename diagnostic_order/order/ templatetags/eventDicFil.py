from django import template
register = template.Library()

@register.filter('keey',keey)
def keey(d,key_name):    
  value = 0    
  try:        
    value = d[key_name]    
  except KeyError:        
    value = 0    
  return value