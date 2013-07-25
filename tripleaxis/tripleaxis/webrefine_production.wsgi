ALLDIRS=['/home/ylem/webrefine/lib/python2.6','/var/www/webrefine/webrefine/tripleaxis']
import os
import sys
import site
from os.path import abspath, dirname, join
#import django.core.handlers.wsgi
#from django.conf import settings



sys.stdout = sys.stderr
myfile=file('/tmp/junk.txt','w')

#Add the path to 3rd party django application and to django itself.

# path is the parent directory of this script ('/var/www' in this case)

# we check for path because we're told to at the tail end of
# http://code.google.com/p/modwsgi/wiki/ConfigurationDirectives#WSGIReloadMechanism 
#if path not in sys.path:


prev_sys_path = list(sys.path)
sys.path=[ALLDIRS[0]]
for directory in ALLDIRS:
  site.addsitedir(directory)

# Reorder sys.path so new directories at the front.
new_sys_path = []
for item in list(sys.path):
    if item not in prev_sys_path:
        new_sys_path.append(item)
        sys.path.remove(item)
sys.path[:0] = new_sys_path 
#myfile.write(sys.path.__str__())

activate_this = '/home/ylem/webrefine/bin/activate_this.py'
myfile.write('activating\n')
execfile(activate_this, dict(__file__=activate_this))
#from site import addsitedir
myfile.write('inserting\n')
#sys.path.insert(0, abspath(join(dirname(__file__), "../../")))
myfile.write('2nd insert\n')
#sys.path.insert(0, abspath(join(dirname(__file__), "../")))

sys.path=['/home/ylem/webrefine/lib/python2.6', '/home/ylem/webrefine/lib/python2.6/plat-linux2', '/home/ylem/webrefine/lib/python2.6/lib-tk', '/home/ylem/webrefine/lib/python2.6/lib-old', '/home/ylem/webrefine/lib/python2.6/lib-dynload', '/usr/lib/python2.6', '/usr/lib64/python2.6', '/usr/lib/python2.6/plat-linux2', '/usr/lib/python2.6/lib-tk', '/usr/lib64/python2.6/lib-tk', '/home/ylem/webrefine/lib/python2.6/site-packages']

myfile.write('inserting\n')
sys.path.insert(0, abspath(join(dirname(__file__), "../../")))
myfile.write('2nd insert\n')
sys.path.insert(0, abspath(join(dirname(__file__), "../")))

myfile.write(sys.path.__str__())
#myfile.close()

os.environ["DJANGO_SETTINGS_MODULE"] = "tripleaxis.settings"

#myfile.write('\n environment\n')


#change below to 'settings_production' for deployment, 'settings' for testing
#os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'





import django.core.handlers.wsgi
#myfile.close()
application = django.core.handlers.wsgi.WSGIHandler()
myfile.write('handled\n')

myfile.close()

