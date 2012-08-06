ALLDIRS=['/home/ylem/webrefine/lib/python2.6/site-packages','/var/www/tripleaxis/webrefine/tripleaxis']
import os
import sys
import site
sys.stdout = sys.stderr
myfile=file('/tmp/junk.txt','w')
#apache_configuration = os.path.dirname(__file__)
#project = os.path.dirname(apache_configuration)
#workspace = os.path.dirname(project)
#sys.path.append(workspace) 

#Add the path to 3rd party django application and to django itself.
#sys.path.append('C:\\yml\\_myScript_\\dj_things\\web_development\\svn_views\\django_src\\trunk')
#sys.path.append('C:\\yml\\_myScript_\\dj_things\\web_development\\svn_views\\django-registration')

#sys.path.append('/var/www/ubmatrixcalculator/')
#sys.path.append('/var/www/')

#sys.path = ['/var/www/tripleaxis/webrefine','/var/www/tripleaxis/webrefine/tripleaxis'] + sys.path

# path is the parent directory of this script ('/var/www' in this case)
#path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# we check for path because we're told to at the tail end of
# http://code.google.com/p/modwsgi/wiki/ConfigurationDirectives#WSGIReloadMechanism 
#if path not in sys.path:
#    sys.path.append(path)


prev_sys_path = list(sys.path)
for directory in ALLDIRS:
  site.addsitedir(directory)

# Reorder sys.path so new directories at the front.
new_sys_path = []
for item in list(sys.path):
    if item not in prev_sys_path:
        new_sys_path.append(item)
        sys.path.remove(item)
sys.path[:0] = new_sys_path 
myfile.write(sys.path.__str__())

activate_this = '/home/ylem/webrefine/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))
from os.path import abspath, dirname, join
from site import addsitedir

sys.path.insert(0, abspath(join(dirname(__file__), "../")))

from django.conf import settings
myfile.write(sys.path.__str__())
myfile.close()

os.environ["DJANGO_SETTINGS_MODULE"] = "tripleaxis.settings"

#sys.path.insert(0, join(settings.PINAX_ROOT, "apps"))
#sys.path.insert(0, join(settings.PROJECT_ROOT, "apps"))


#change below to 'settings_production' for deployment, 'settings' for testing
#os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

import django.core.handlers.wsgi

application = django.core.handlers.wsgi.WSGIHandler()

