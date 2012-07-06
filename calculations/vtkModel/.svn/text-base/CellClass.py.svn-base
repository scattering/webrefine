"""
Disclaimer
==========

This software was developed at the National Institute of Standards and Technology at the NIST Center for Neutron Research by employees of the Federal Government in the course of their official duties. Pursuant to title 17 section 105* of the United States Code this software is not subject to copyright protection and is in the public domain. The SPINAL software package is an experimental spinwave analysis system. NIST assumes no responsibility whatsoever for its use, and makes no guarantees, expressed or implied, about its quality, reliability, or any other characteristic. The use of certain trade names or commercial products does not imply any endorsement of a particular product, nor does it imply that the named product is necessarily the best product for the stated purpose. We would appreciate acknowledgment if the software is used.

*Subject matter of copyright: United States Government works

Copyright protection under this title is not available for any work of the United States Government, but the United States Government is not precluded from receiving and holding copyrights transferred to it by assignment, bequest, or otherwise."""


import SymmetryUtilities
import numpy
from AtomClass import Atom
from BondClass import Bond
import random

class Cell():
    """This class models a single crystallographic unit cell. (The entire
    lattice could consist of many of these.)

    The class is instantiated with the space group and dimensions(although
    the dimensions are not currently used for anything).
    Then atoms can be added using the generateAtoms() method which will add
    all symmetry equivalent atoms."""
    
    def  __init__(self, Space_Group, PosX = 0, PosY = 0, PosZ = 0, a=1, b=1,
                  c=1, alpha=90, gamma=90, beta=90):
        """PosX, PosY, PosZ are the fractional coordinates of the cell - they
        should all be integers
        Space_Group is an instance of the SpaceGroup class(SpaceGroups.py)

        Bonds are not stored in this class becuase some span more than one
        crystallographic unit cell.  They are stored in the magnetic or cutoff
        cell classes."""
        self.Space_Group = Space_Group
        
        #These should be integers
        self.PosX = PosX#position world coordinates in vtk renderer
        self.PosY = PosY
        self.PosZ = PosZ
        
        #Dimensions
        self.a = a
        self.b = b
        self.c = c
        self.alpha = alpha
        self.gamma = gamma
        self.beta = beta
        
        #List of atom contained in this unit cell
        #self.Atoms = []
        #Each atom is given a unique identifying ID number (they key in this dictionary)
        self.atoms = {}
        
        
    
    #functions
    def getSpaceGroup(self):
        return self.Space_Group
    
    def atomAtPosition(self,position):
        """Returns the atom at the position if one exists, None otherwise"""
        if self.positionIsInCell(position):
            positionList = []
            tmpAtoms = []
            for num, atom in self.atoms.items():
                tmpAtoms.append(atom)
                positionList.append(atom.getPosition())
            closest = tmpAtoms[SymmetryUtilities.nearestSiteIndex(positionList,position)]
            if SymmetryUtilities.equalPositions(closest.getPosition(), position):
                return closest
        return None
    
    def positionIsInCell(self, position):
        """Returns true if the given position is in this unit cell and false
        otherwise"""
        if self.PosX <= position[0] and (self.PosX+1) > position[0]: #check x
            if self.PosY <= position[1] and (self.PosY+1) > position[1]: #check y
                if self.PosZ <= position[2] and (self.PosZ+1) > position[2]: #check z
                    return True
        return False
    
    def addAtom(self, Atom):
        """Adds the given atom to this unit cell and gives it a new unique id
        number which can be used to reference the atom within the cell. This id
        number is also returned.
	"""
        idNum = 1#numbers sart at 1
        keys = self.atoms.keys()
        keys.sort()
        if len(keys) > 0:
            maxVal = keys[len(keys)-1]
            while idNum <= maxVal and idNum == keys[idNum-1]:
                idNum += 1
        self.atoms[idNum] = Atom
        return idNum
    
    def getAtoms(self):
        return self.atoms.values()
    
    def setPosX(self, x):
        self.PosX = x
    
    def setPosY(self, y):
        self.PosY = y
    
    def setPosZ(self, z):
        self.PosZ = z
        
    def getPosition(self):
        return (self.PosX, self.PosY, self.PosZ)
                   
    def translateCell(self, a, b, c):
        """Returns a new unit cell translated by a,b and c in those respective
        directions.

        The new cell will have the translated coordinates and a list of atoms
        with the same indeces(which are used as an identifying characteristic)
        as their cooresponding atoms in this cell."""
        new_cell = Cell(self.Space_Group,a,b,c,self.a, self.b, self.c, self.alpha, self.beta, self.gamma)
        for atomn in self.atoms.values():  #should preserve order of Atoms
            #new_cell.addAtom(Atom(new_cell, position[0], position[1], position[2], atomn.massNumber, atomn.getDescription(), atomn.valence, atomn.getRadius(), color[0], color[1], color[2], anisotropy = atomn.getAnisotropy(), spinMagnitude = atomn.spinMagnitude, elementObj = atomn.getElementObj()))
            new_atom = Atom(new_cell, atomn.getPosition(),
                            atomn.getElementSymbol(), atomn.getMassNum(),
                            atomn.getValence(), atomn.getAnisotropy(),
                            atomn.getSpinMagnitude(), atomn.getSpin(),
                            atomn.getDescription(), atomn.getColor(),
                            atomn.getRadius())
            #make sure the id numbers match up and ar the same as original cell
            new_cell.atoms.pop(new_atom.getIDNum())
            new_atom.IDNumber = atomn.IDNumber
            new_cell[atomn.IDNumber] = new_atom

        return new_cell

    def __str__(self):
        return "unit cell at (" + str(self.PosX) + ", " + str(self.PosY) + ", " + str(self.PosZ) + ")"
    
    def atomWithID(self, idNum):
        return self.atoms[idNum]
    
    def getAtomID(self, atom):
        """Will return the ID number of the given atom in this cell.
	If the atom is not in this cell, a KeyError will be raised."""
        for key in self.atoms.keys():
            if self.atoms[key] == atom:
                return key
        #None could also be returned, but the user is either testing for this
        #case(in which case it doesn't matter what how I handle it, or they
        #are not and an error will ccur somewhere.  Better here than somewhere
        #where it will be hard to track the problem.
        raise ValueError("That atom does not exist in this unit cell.")
    
    #def generateAtoms(self, elementObj, position, massNumber, valence, anisotropy = (0,0,0), spinMagnitude = 1, description = "", spin = None, rgb = None, radius = None):
    def generateAtoms(self, symbol, position, massNum = None, **kwds):
        """Given the information of one atom and the space group associated with
        this Cell object, this method creates all the symmetry equivalent atoms
        and adds them to the model (cutoff cell).
        
        -symbol is the element symbol (H, He, Li...)
	-massNum is the atomic Mass Number for the element
	If the symbol and mass number do not correspond to a real element, an
	ElementNotFound Exception will be raised.  massNum can, however, be None.
	
        -position is the fractional coordinates in the unit cell (a,b,c)
        
        Optional keyword arguments are:
        (spin, spinMagnitude, valence, anisotropy, rgb, radius, and description)
        
        -spin is a tuple(Sx, Sy, Sz). It is optional.
        -spinMagnitude is the total magnitude of the spin =sqrt(Sx^2+Sy^2+Sz^2)
        -anisotropy is the single ion anisotropy of the atom (Dx, Dy, Dz)
        -rgb is a 3 element tuple or list describing the color of the atom.  If
        this is notsupplied, the default color for that element is used.
        -radius is the radius of the atom in angstroms.  If it is None, it will
        be given the default value for the given element.
        -description is a string describing the atom such as a name/label and is
        optional.
        -Valence is a string describing the charge of the atom.
        """
        locations = SymmetryUtilities.expandPosition(self.Space_Group, numpy.array([position[0],position[1], position[2]]))[0]

        for coord in locations:
            #atom = Atom(self, coord[0], coord[1], coord[2], massNumber, description, valence, radius, r,g,b, anisotropy = anisotropy, spinMagnitude = spinMagnitude, elementObj = elementObj)
            #atom = Atom(elementObj, self, coord, valence, anisotropy, spinMagnitude, spin, description, rgb, radius)
            Atom(self, coord, symbol, massNum, **kwds)
            #self.addAtom(atom)

    def getA(self):
        return self.a
    
    def getB(self):
        return self.b
    
    def getC(self):
        return self.c
    
    def getAlpha(self):
        return self.alpha
    
    def getBeta(self):
        return self.beta
    
    def getGamma(self):
        return self.gamma
    

