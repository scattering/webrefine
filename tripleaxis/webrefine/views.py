# Create your views here.

import sys
import os
import types
import hashlib
import cStringIO, gzip
import shlex
sys.stderr.write("before")
import hklGen
sys.stderr.write("after")
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
from ubmatrix_general import calcq, star
I=np.complex(0,-1)
#hkl=[[0,1,1],[1,0,1],[0,2,0],[1,1,1],[2,0,0],[2,1,0],[1,2,1],[0,0,2]]
import read_cif

def calculateStructFact(data):
    sg_name= data['lattice'][0]['spaceGroup'].split()[0]
    #sg_name=''
    #for letter in sg_name_list:
        #sg_name=sg_name+letter
    #shlex.split(spaceG)
    #spaceG = 'sg'+spaceG
    print sg_name
    #my_group=getattr(SpaceGroups,spaceG)
    my_group=SpaceGroups.GetSpaceGroup(sg_name)
    mycell=Cell(my_group)
    F=0.0
    tMin=float(data['lattice'][0]['tMin'])
    tMax=float(data['lattice'][0]['tMax'])
    wavelength=float(data['lattice'][0]['wave'])
    sMin=hklGen.getS(float(tMin), float(wavelength))
    sMax=hklGen.getS(float(tMax), float(wavelength))
    spcgroup=hklGen.SpaceGroup(sg_name)
    print spcgroup.symbol
    abc=[float(data['lattice'][0]['a']), float(data['lattice'][0]['b']), float(data['lattice'][0]['c'])]
    albega=[float(data['lattice'][0]['alpha']), float(data['lattice'][0]['beta']), float(data['lattice'][0]['gamma'])]
    cell=hklGen.CrystalCell(abc, albega)
    hkl=hklGen.hklGen(spcgroup,cell,float(sMin),float(sMax))
    #hkl=[[0,1,1],[1,0,1],[0,2,0],[1,1,1],[2,0,0],[2,1,0],[1,2,1],[0,0,2]]
    #g=np.array([0,2,0],'Float64') 
    
    n=0
    #x=0
    i=0
    result = []
    for datum in data['element']:
        x=float(datum['x'])
        y=float(datum['y'])
        z=float(datum['z'])
        name=datum['element']
        print name,x,y,z
        mycell.generateAtoms(name,(x,y,z))
        
    while (n<len(hkl)):
        h = list(hkl[n].hkl)[0]
        k = list(hkl[n].hkl)[1]
        l = list(hkl[n].hkl)[2]
        g=np.array([h,k,l],'Float64')
        twotheta = np.degrees(2 * np.arcsin(wavelength * hkl[n].s))
        
        print h,k,l,g
        F = 0.0
        for key, value in mycell.atoms.items():                   
            d=value.getPosition()
            #print d
            sym=value.getElementSymbol()
            b=periodictable.elements.symbol(sym).neutron.b_c#sld(wavelength=1.54)[0]
            F=F+b*np.exp(-1.0j*2*np.pi*np.dot(g,d))
        print np.absolute(F)
        F=round(F, 5)
        twotheta=round(twotheta,5)
        print 'done'
        n = n+1   
        result = result + [h,k,l,np.absolute(F),twotheta]
    return result

def calcTwoTheta(data):
    stars = star(data['lattice'][0]['a'],data['lattice'][0]['b'], data['lattice'][0]['c'], data['lattice'][0]['alpha'], data['lattice'][0]['beta'], data['lattice'][0]['gamma'])
    stars_dict = dict(zip(('astar','bstar','cstar','alphastar','betastar','gammastar'),stars))
    n=0
    wavelength= float(data['num'][0]['num'])
    result = []
    while (n<8):
        q = calcq (list(hkl[n][0]), list(hkl[n][1]), list(hkl[n][2]), stars_dict)
        twotheta = np.degrees(2 * np.arcsin(wavelength * q / 4 / np.pi))
        result = result + [twotheta]
        n = n + 1
        
    print result    
    return result

## models
from django.contrib.auth.models import User 

from django.conf import settings
FILES_DIR=settings.FILES_DIR

def home(request):
    context = RequestContext(request)
    sys.stderr.write("home again!\n")
    return render(request,r'webrefine/webrefine.html', locals(), context_instance=context)

@csrf_exempt
def nuclear_scattering(request):
    context = RequestContext(request)
    print "hi"
    data = simplejson.loads(request.POST['data'])
    results = calculateStructFact(data)    
    print results
    #twotheta=calcTwoTheta(data)
    #print twotheta
    #total = [results,twotheta]
    #print cifFileHandling.CIF_to_cell()
    return HttpResponse(simplejson.dumps(results))



def handle_uploaded_file(f):
    with open(os.path.join('/tmp',str(f.name)), 'wb+') as destination:
        for chunk in f.chunks():
            destination.write(chunk)

@csrf_exempt
def cif_file_reading(request):
    context = RequestContext(request)
    print "hi"
    #cifFile=simplejson.loads(request.POST['data'])
    handle_uploaded_file(request.FILES['thefile'])    
    crystalInfo = read_cif.cif_to_cell(os.path.join('/tmp',str(request.FILES['thefile'].name)))
    return HttpResponse(simplejson.dumps(crystalInfo))
