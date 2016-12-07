from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'diagnostic_order.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'launch.html', 'order.views.launch', name='launch'),
    url(r'fhir-app/tmp/main.html$' ,'order.views.main', name='main'),
    url(r'^fhir-app/$', 'order.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'index.html', 'order.views.recv_code', name='recv_code'),
    #url(r'new_order/search_orderer/$', 'order.views.search_orderer', name='search_orderer'),
    url(r'search_subject/$', 'order.views.search_subject', name='search_subject'),
    url(r'search_type/$', 'order.views.search_type', name='search_type'),
    url(r'search_Observation/$', 'order.views.search_Observation', name='search_Observation'),
    url(r'search_sptInfo/$', 'order.views.search_sptInfo', name='search_sptInfo'),
    url(r'search_specimen/$', 'order.views.search_specimen', name='search_specimen'),
    url(r'search_actor/$', 'order.views.search_actor', name='search_actor'),
    url(r'^fhir-app/test$', 'order.views.test', name='test'),
    url(r'^fhir-app/orders/(?P<status>\w{2})$', 'order.views.check_order', name='check_order'),
    url(r'^new_order/$', 'order.views.new_order', name='new_order'),
    url(r'^new_order/submit/', 'order.views.submit', name='submit'),
    url(r'^fhir-app/orders/order_detail/(?P<id>.+)$', 'order.views.order_detail', name='order_detail'),
    url(r'^new_order/updata/$', 'order.views.updata', name="updata"),
    url(r'^edit_order/(?P<id>.+)', 'order.views.edit', name="edit"),
    url(r'^updataOrder/$', 'order.views.updataOrder', name="updataOrder"),
    url(r'recv_redirect/', 'order.views.recv_redirect', name='recv_redirect'),
    url(r'^new_order/search_target/$', 'order.views.search_target', name='target')
    
)
