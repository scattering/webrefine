from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from django.conf import settings
from django.conf.urls.defaults import * 
#from django.views.generic.list_detail import object_detail
#from hitcount.views import update_hit_count_ajax

REPO_ROOT=settings.REPO_ROOT


#urlpatterns = patterns(REPO_ROOT+'.webrefine.views',
    ## Examples:
    ## url(r'^$', 'tripleaxis.views.home', name='home'),
    ## url(r'^tripleaxis/', include('tripleaxis.foo.urls')),
    
    ## Uncomment the admin/doc line below to enable admin documentation:
    ## url(r'^admin/doc/', include('django.contrib.admindocs.urls')),


#)


urlpatterns = patterns('',
		      url(r'^admin/', include(admin.site.urls)),
                      url(r'^tracking/', include('tracking.urls')),
		      #(r'', include('registration.urls')),
		      #(r'^profiles/', include('profiles.urls')),
                      (r'^nuclear_scattering$', 'webrefine.views.nuclear_scattering'),
                      (r'^cif_file_reading$', 'webrefine.views.cif_file_reading'),
		      (r'^$', 'webrefine.views.home'),
                      

		      )
