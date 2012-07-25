# Create your views here.

import sys
import os
import types
import hashlib
import cStringIO, gzip
from django.shortcuts import render_to_response, render
from django.http import HttpResponse, HttpResponseRedirect, QueryDict
from django.utils import simplejson
import json # keeps order of OrderedDict on dumps!
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger #paging for lists
from django.core.exceptions import ObjectDoesNotExist
import simplejson
import numpy as np
from calculations.vtkModel.AtomClass import Atom
from calculations.vtkModel.CellClass import Cell
import calculations.vtkModel.SpaceGroups as SpaceGroups
import periodictable
import math
I=np.complex(0,-1)

def calculateStructFact(data):
    my_group=SpaceGroups.sg62
    mycell=Cell(my_group)
    #Mn=Atom(mycell, (0,0,0),"Mn")
    #idNum=mycell.addAtom(Mn)
    F=0.0
    a = 0
    #hkl={[0,0,0],[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1]}
    g=np.array([0,2,0],'Float64') 
    c=data['num'][0]['num']
    c=int(c)
    
    
    for i in range(0,c):
        x=data['element'][i]['x']
        x=float(x)
        y=data['element'][i]['y']
        y=float(y)
        z=data['element'][i]['z']
        z=float(z)        
        mycell.generateAtoms(data['element'][i]['element'],(x,y,z))
    for key, value in mycell.atoms.items():
        d=value.getPosition()
        sym=value.getElementSymbol()
        b=periodictable.elements.symbol(sym).neutron.b_c#sld(wavelength=1.54)[0]
        F=(F+b*np.exp(-1.0j*2*np.pi*np.dot(g,d)))
        F =  (F.real)*(F.real) + (F.imag)*(F.imag)
        F = math.sqrt(F)
        #F = F*F
    
        print sym,b,d,F
        
    print F
    
    print 'done'
    return g[0],g[1],g[2],F

## models
from django.contrib.auth.models import User 

from django.conf import settings
FILES_DIR=settings.FILES_DIR

def home(request):
    context = RequestContext(request)
    
    return render(request,r'webrefine/webrefine.html', locals(), context_instance=context)

@csrf_exempt
def nuclear_scattering(request):
    context = RequestContext(request)
    print "hi"
    data = simplejson.loads(request.POST['data'])
    results = calculateStructFact(data)
    print results
    return HttpResponse(simplejson.dumps(results))