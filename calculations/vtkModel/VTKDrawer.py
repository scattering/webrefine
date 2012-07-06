"""
Disclaimer
==========

This software was developed at the National Institute of Standards and Technology at the NIST Center for Neutron Research by employees of the Federal Government in the course of their official duties. Pursuant to title 17 section 105* of the United States Code this software is not subject to copyright protection and is in the public domain. The SPINAL software package is an experimental spinwave analysis system. NIST assumes no responsibility whatsoever for its use, and makes no guarantees, expressed or implied, about its quality, reliability, or any other characteristic. The use of certain trade names or commercial products does not imply any endorsement of a particular product, nor does it imply that the named product is necessarily the best product for the stated purpose. We would appreciate acknowledgment if the software is used.

*Subject matter of copyright: United States Government works

Copyright protection under this title is not available for any work of the United States Government, but the United States Government is not precluded from receiving and holding copyrights transferred to it by assignment, bequest, or otherwise."""

import vtk
from vtk import *
import scipy
import math
import numpy


class vtkDrawer():
    """This class is used to draw the crystal lattice in vtk. (Creating actors
    and adding them to a renderer"""
    def __init__(self, renderer):
        self.ren1 = renderer
        self.actors = {}# associate actors with their model objects for picking
    
    
    #Default Sphere resolution
    default_Sphere_Res = 30
    defaultBondRadius = .02
    
    
    def getObjFromActor(self, actor):
        """Given actor, this method returns the object that that actor was
        createdto represent."""
        if actor != None:
            return self.actors[actor]
        return None
    
    
    def drawAtom(self, atom):
        """Adds a sphere actor to the renderer with the color and radius of the
        atom object.  Also if the atom has a spin, an arrow is created to represent
        the spin."""
        #sphere geometry
        sphere_Source = vtkSphereSource()
        sphere_Source.SetRadius(atom.getRadius())
        sphere_Source.SetThetaResolution(self.default_Sphere_Res)
        sphere_Source.SetPhiResolution(self.default_Sphere_Res)
            
        #map to graphics objects
        sphereMap = vtkPolyDataMapper()
        sphereMap.SetInput(sphere_Source.GetOutput())
            
        #actor coordinates geometry, properties, transformation
        sphere_Actor = vtkLODActor()
        sphere_Actor.SetMapper(sphereMap)
        sphere_Actor.GetProperty().SetColor(atom.getColor())
            
        #sphere_Actor.SetPosition(atom.getPosition())
        sphere_Actor.SetPosition(atom.getRealPosition())
        
        self.ren1.AddActor(sphere_Actor)
        
        #Add reference for picking
        self.actors[sphere_Actor] = atom
        
        
        #Add arrow
        if atom.getSpin() != None:
            arrowSource = vtkArrowSource()
    #        arrowSource.SetShaftRadius(arrowSource.GetShaftRadius()/5)
    #        arrowSource.SetTipLength(arrowSource.GetTipLength()/5)
    #        arrowSource.SetTipRadius(arrowSource.GetTipRadius()/5)
    
            #Arrows have a set length, so a transform is used to change their size
            aTransform = vtkTransform()
            aTransform.Scale(.25,.25,.25)
            transform = vtkTransformPolyDataFilter()
            transform.SetTransform(aTransform)
            transform.SetInputConnection(arrowSource.GetOutputPort())
            
            arrowMap = vtkPolyDataMapper()
            arrowMap.SetInput(transform.GetOutput())

            #Create the arrow actor
            arrowActor = vtkLODActor()
            arrowActor.SetMapper(arrowMap)
            
            
            #Spin Vector
            x = atom.getSpin()[0]
            y = atom.getSpin()[1]
            z = atom.getSpin()[2]
            
            #create unit vetor
            vectLength = (x**2 + y**2 + z**2)**.5
            unitX = x/vectLength
            unitY = y/vectLength
            unitZ = z/vectLength
            
            position = list(atom.getRealPosition())
            position[0] += unitX*atom.getRadius()
            position[1] += unitY*atom.getRadius()
            position[2] += unitZ*atom.getRadius()
            arrowActor.SetPosition(position)
            arrowActor.GetProperty().SetColor((1,0,0))
            

            #In vtk, we start with an arrow actor pointed along the x axis.
            #We need to then rotate it about a given vector by a given angle
            #to get the desired orientation.  We use the cross product of the
            #desired orientation vector and the defualt vtk orientation(1,0,0)
            #to find the vector to rotate about.  The magnitude of this vector
            #is equal to sin(theta) if the two vectors we crossed are unit
            #vectors.


            #Angle
            #cross product of Unit vectors arrow direction and desired orientation
            i, j, k = self.crossProduct(1, 0, 0, unitX, unitY, unitZ)  #default orientation for the arrow is along x axis
            theta = scipy.arcsin((i**2+j**2+k**2)**.5)*180/math.pi
#            print i,j,k
            
            #if the angle is obtuse, theta must be corrected
            if self.dotProduct(1, 0, 0, unitX, unitY, unitZ) >= 0:
                arrowActor.RotateWXYZ(theta, i, j, k)
            else:#Angle is obtuse
                arrowActor.RotateWXYZ(180 - theta, i, j, k)
            
            self.ren1.AddActor(arrowActor)
        
    
    
    
    def drawBond(self, bond):
        """Creates a cylinder actor connecting the surfaces of the two atoms."""
        cylinder = self.makeCylinder(bond.getAtom1().getRealPosition(), bond.getAtom2().getRealPosition(), bond.getAtom1().getRadius(), bond.getAtom2().getRadius(), bond.getAtom1().getUnitCell())
        self.actors[cylinder] = bond
        self.ren1.AddActor(cylinder)

    def makeCylinder (self, posOne, posTwo, rad_One, rad_Two, unitCell):
        """returns a cylindrical Actor to represent a bond
        
        PosOne and PosTwo are the positions of the two spherical actors
        rad_One and rad_Two are the radii of the spheres

        The cylinder will connect the surfaces of the two spheres.
        The default color for a bond is currently blue."""
        #coordinates of vector pointing from SphereTwo to SphereOne
        x = posTwo[0] - posOne[0]
        y = posTwo[1] - posOne[1]
        z = posTwo[2] - posOne[2]
        
        #The distance form the surface of one sphere to the surface of the other
        distance = ((x**2 + y**2 + z**2)**.5 -rad_One - rad_Two)
        
        #create cylinder
        cylinder = vtkCylinderSource()
        cylinder.SetRadius(self.defaultBondRadius)
        cylinder.SetResolution(100)
        
        #map to another map
        cylinderMap = vtkPolyDataMapper()
        cylinderMap.SetInput(cylinder.GetOutput())
        
        #create cylinder actor
        aCylinder = vtkLODActor()
        aCylinder.SetMapper(cylinderMap)
        aCylinder.GetProperty().SetColor(0, .1, .6)
        #aCylinder.SetScale(.2, distance, .2)
        
        #Arbitrary way of scaling the cylinder to the cell size
        smallestDim = unitCell.getA()
        b = unitCell.getB()
        c = unitCell.getC()
        if smallestDim > b:
            smallestDim = b
        if smallestDim > c:
            smallestDim = c
        scale = smallestDim/4
        aCylinder.SetScale(scale, distance, scale)

        
        #to get the center point between the surfaces of the two spheres
        #create a unit vector and multiply it by the distance/2
        
        #create unit vetor
        vectLength = (x**2 + y**2 + z**2)**.5
        unitX = x/vectLength
        unitY = y/vectLength
        unitZ = z/vectLength
    
        #get center coordinates (center point between two sphere surfaces)
        centerX = (unitX * (rad_One + distance/2)) + posOne[0]
        centerY = (unitY * (rad_One + distance/2)) + posOne[1]
        centerZ = (unitZ * (rad_One + distance/2)) + posOne[2]
        aCylinder.SetPosition(centerX, centerY, centerZ)
        
        
        #In vtk, we start with a cylinder actor pointed along the y axis.
        #We need to then rotate it about a given vector by a given angle
        #to get the desired orientation.  We use the cross product of the
        #desired orientation vector and the defualt vtk orientation(0,1,0)
        #to find the vector to rotate about.  The magnitude of this vector
        #is equal to sin(theta) if the two vectors we crossed are unit
        #vectors.


        #Angle
        #cross product of Unit vectors cylinder direction and desired orientation
        i, j, k = self.crossProduct(0, 1, 0, unitX, unitY, unitZ)  #default orientation for the cylinder is along y axis
        theta = scipy.arcsin((i**2+j**2+k**2)**.5)*180/math.pi
        
        #if the angle is obtuse, theta must be corrected
        if self.dotProduct(0, 1, 0, unitX, unitY, unitZ) >= 0:
            aCylinder.RotateWXYZ(theta, i, j, k)
        else:
            aCylinder.RotateWXYZ(theta, -i, -j, -k)
        
        return aCylinder
    
    def dotProduct(self, x1, y1, z1, x2, y2, z2):
        """x,y,z represent vector coordinates - used by makeCylinder; and drawing spin"""
        return (x1*x2 + y1*y2 + z1*z2)
    
    def crossProduct(self, x1, y1, z1, x2, y2, z2):
        """x,y,z represent vector coordinates - used by makeCylinder; and drawing spin"""
        i = (y1*z2) - (z1*y2)
        j = -(x1*z2) + (z1*x2)
        k = (x1*y2) - (y1*x2)
        return i, j, k
    
    
   
    def drawUnitCell(self, cell):
        """Draws the unit cell by creating a light bluish box(Cells are currently
        only represented as cubes.)  All the atoms in the cell are also drawn."""

        #draw very light box to show boundaries of the unit cell

        #Create "Cube" Source
        box = vtkCubeSource()
        #box.SetXLength(1)
        #box.SetYLength(1)
        #box.SetZLength(1)
        box.SetXLength(cell.getA())
        box.SetYLength(cell.getB())
        box.SetZLength(cell.getC())
        
        boxMap = vtkPolyDataMapper()
        boxMap.SetInput(box.GetOutput())
        
        #create actor
        abox = vtkLODActor()
        abox.SetMapper(boxMap)
        abox.GetProperty().SetColor(0, .1, .6)
        abox.GetProperty().SetOpacity(.1)
        a, b, c = cell.getPosition()
        a = (a + .5)*cell.getA()
        b = (b + .5)*cell.getB()
        c = (c + .5)*cell.getC()
        abox.SetPosition(a,b,c)
        #abox.SetPosition(a + .5, b + .5, c + .5)
        abox.PickableOff()
        
        #Add the actor to the renderer 
        self.ren1.AddActor(abox)
        
        #Add the Atoms to the renderer
        for atom in cell.getAtoms():
            self.drawAtom(atom)
            
            
    
    def labelAtoms(self, magneticCell):
        """Creates number labels on the +x side of the sphere.
        The labels are the atom indices within the crystallographic unit cell."""
        #for cell in magneticCell.getAllUnitCells():
            #AtomList = cell.getAtoms()
            #for index in range(0, len(AtomList)):
                #atom = AtomList[index]
        for atom in magneticCell.getAllAtoms():
            label = vtkVectorText()
            #print 'description: ', atom.description
            idNum = atom.getIDNum()
            label.SetText(atom.description + " " + str(idNum))
            labelMapper = vtkPolyDataMapper()
            labelMapper.SetInputConnection(label.GetOutputPort())
            labelActor = vtkFollower()
            labelActor.SetMapper(labelMapper)
            #labelActor.SetScale(0.05, 0.05, 0.05)
            #Arbitrary function for scaling label sizes
            scale = atom.getRadius()/15.0
            scale += atom.getUnitCell().getA()/90.0
            scale += atom.getUnitCell().getB()/90.0
            scale += atom.getUnitCell().getC()/90.0
            labelActor.SetScale(scale, scale, scale)
            x, y, z = atom.getRealPosition()
            x += atom.getRadius()  #display the label on the +x side of sphere
            labelActor.AddPosition(x, y, z)
            labelActor.GetProperty().SetColor(0, 0, 0)
            
            self.ren1.AddActor(labelActor)
            
            #Getting the camera before the image has been rendered will make
            #it focus on the origin, so we want to recenter it after this.
            labelActor.SetCamera(self.ren1.GetActiveCamera())
            
            self.ren1.ResetCamera()
                    
            
    
    def drawMagneticCell(self, MagCell):
        """Draws each crystallographic unit cell in the magnetic cell as well as
        each bond."""
        for cell in MagCell.getAllUnitCells():
            self.drawUnitCell(cell)
            #Draw intercellular bonds
            for bond in MagCell.getBonds():
                self.drawBond(bond)

    #Replacing magnetic cell
    def drawCutoffCell(self, cutoffCell):
        for cell in cutoffCell.getAllUnitCells():
            self.drawUnitCell(cell)
            for bond in cutoffCell.getBonds():
                self.drawBond(bond)
            
    def addAxes(self):
        """Draws the axdes, which each have length 1;  Then puts a label on each
        (x, y, and z)"""
        
        #Add Axes
        axes = vtkAxes()
        axes.SetOrigin(-0.1, 0, -0.1)
        axes.SetScaleFactor(1.0)
#        axesMapper = vtkPolyDataMapper()
#        axesMapper.SetInputConnection(axes.GetOutputPort())

        axesTubes = vtk.vtkTubeFilter()
        axesTubes.SetInputConnection(axes.GetOutputPort())
        axesTubes.SetRadius(axes.GetScaleFactor()/50.0)
        axesTubes.SetNumberOfSides(8)
        
        axesMapper = vtk.vtkPolyDataMapper()
        axesMapper.SetInputConnection(axesTubes.GetOutputPort())

        axesActor = vtkLODActor()
        axesActor.PickableOff()
        axesActor.SetMapper(axesMapper)
        self.ren1.AddActor(axesActor)

        xLabel = vtkVectorText()
        yLabel = vtkVectorText()
        zLabel = vtkVectorText()
        xLabel.SetText("a")
        yLabel.SetText("b")
        zLabel.SetText("c")
        xLabelMapper = vtkPolyDataMapper()
        yLabelMapper = vtkPolyDataMapper()
        zLabelMapper = vtkPolyDataMapper()
        xLabelMapper.SetInputConnection(xLabel.GetOutputPort())
        yLabelMapper.SetInputConnection(yLabel.GetOutputPort())
        zLabelMapper.SetInputConnection(zLabel.GetOutputPort())
        xLabelActor = vtkFollower()
        yLabelActor = vtkFollower()
        zLabelActor = vtkFollower()
        xLabelActor.SetMapper(xLabelMapper)
        yLabelActor.SetMapper(yLabelMapper)
        zLabelActor.SetMapper(zLabelMapper)
        xLabelActor.SetScale(0.15, 0.15, 0.15)
        yLabelActor.SetScale(0.15, 0.15, 0.15)
        zLabelActor.SetScale(0.15, 0.15, 0.15)
        xLabelActor.AddPosition(1.0, 0.0, -0.3)
        yLabelActor.AddPosition(-0.3, 1.0, -0.3)
        zLabelActor.AddPosition(-0.3, 0.0, 1)
        xLabelActor.GetProperty().SetColor(0.0, 0.0, 0.0)
        yLabelActor.GetProperty().SetColor(0.0, 0.0, 0.0)
        zLabelActor.GetProperty().SetColor(0.0, 0.0, 0.0)
        self.ren1.AddActor(xLabelActor)
        self.ren1.AddActor(yLabelActor)
        self.ren1.AddActor(zLabelActor)
        
        #These must be called after ren1 has a camera, otherwise it makes one that is not satisfactory
        #Without them though, 'x','y','z' labels will not be visible from some angles
        xLabelActor.SetCamera(self.ren1.GetActiveCamera())
        yLabelActor.SetCamera(self.ren1.GetActiveCamera())
        zLabelActor.SetCamera(self.ren1.GetActiveCamera())

        #This should fix the camera if this method is called before rendering.
        self.ren1.ResetCamera()
