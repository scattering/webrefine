# Create your views here.

import sys
import os
import types
import hashlib
import cStringIO, gzip
import shlex
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
    spaceG = data['lattice'][0]['spaceGroup']
    shlex.split(spaceG)
    spaceG = 'sg'+spaceG[0]
    print spaceG
    my_group=getattr(SpaceGroups,spaceG)
    mycell=Cell(my_group)
    #Mn=Atom(mycell, (0,0,0),"Mn")
    #idNum=mycell.addAtom(Mn)
    F=0.0
    
    hkl=[[0,1,1],[1,0,1],[0,2,0],[1,1,1],[2,0,0],[2,1,0],[1,2,1],[0,0,2]]
    #g=np.array([0,2,0],'Float64') 
    c=data['num'][0]['num']
    c=int(c)
    n=0
    #x=0
    i=0
    result = []
    while (i<c):
        x=data['element'][i]['x']
        x=float(x)
        y=data['element'][i]['y']
        y=float(y)
        z=data['element'][i]['z']
        z=float(z)
        name=data['element'][i]['element']
        print name,x,y,z
        mycell.generateAtoms(name,(x,y,z))
        i = i + 1
    while (n<8):
        
        h = hkl[n][0]
        h = int(h)
        k = hkl[n][1]
        k = int(k) 
        m = hkl[n][2]
        m = int(m)
        g=np.array([h,k,m],'Float64')
        
        print h,k,m,g
        F = 0.0
        for key, value in mycell.atoms.items():                   
            d=value.getPosition()
            #print d
            sym=value.getElementSymbol()
            b=periodictable.elements.symbol(sym).neutron.b_c#sld(wavelength=1.54)[0]
            F=F+b*np.exp(-1.0j*2*np.pi*np.dot(g,d))
            F = F.real
        print np.absolute(F)
        print 'done'
        n = n+1   
        result = result + [hkl[n-1][0],hkl[n-1][1],hkl[n-1][2],np.absolute(F)]
        print result
    return result

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