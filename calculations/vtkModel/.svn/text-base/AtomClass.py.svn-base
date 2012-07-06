"""
Disclaimer
==========

This software was developed at the National Institute of Standards and Technology at the NIST Center for Neutron Research by employees of the Federal Government in the course of their official duties. Pursuant to title 17 section 105* of the United States Code this software is not subject to copyright protection and is in the public domain. The SPINAL software package is an experimental spinwave analysis system. NIST assumes no responsibility whatsoever for its use, and makes no guarantees, expressed or implied, about its quality, reliability, or any other characteristic. The use of certain trade names or commercial products does not imply any endorsement of a particular product, nor does it imply that the named product is necessarily the best product for the stated purpose. We would appreciate acknowledgment if the software is used.

*Subject matter of copyright: United States Government works

Copyright protection under this title is not available for any work of the United States Government, but the United States Government is not precluded from receiving and holding copyrights transferred to it by assignment, bequest, or otherwise."""


import periodictable

#This color scheme follows the defaults of the VENUS software.
#D is deuterium and T is tritium.
color_dict = {"H":(255,204,204), #"D":(255,204,204), "T":(255,204,204),
              "He":(252,232,206), "Li":(134,224,116),
              "Be":(94,215,123), "B":(31,162,15), "C":(128,73,41),
              "N": (176,185,230), "O":(254,3,0), "F":(176,185,230),
              "Ne": (254,55,181), "Na":(249,220,60), "Mg":(251,123,21),
              "Al": (129,178,214), "Si":(27,59,250), "P": (192,156,194),
              "S": (255,250,0), "Cl": (49,252,2), "Ar": (207,254,196),
              "K": (161,33,246), "Ca": (90,150,189), "Sc":(181,99,171),
              "Ti": (120,202,255), "V": (229,25,0), "Cr": (0,0,158),
              "Mn": (168,8,158), "Fe": (181,113,0), "Co": (0,0,175),
              "Ni": (183,187,189), "Cu": (34,71,220), "Zn": (143,143,129),
              "Ga": (158,227,115), "Ge": (126,110,166), "As": (116,208,87),
              "Se": (154,239,15), "Br": (126,49,2), "Kr": (250,193,243),
              "Rb": (255,0,153), "Sr": (0,255,38), "Y": (102,152,142),
              "Zr": (0,255,0), "Nb": (76,178,118), "Mo": (179,134,175),
              "Tc": (205,175,202), "Ru": (207,183,173), "Rh": (205,209,171),
              "Pd": (193,195,184), "Ag": (183,187,189), "Cd": (242, 30, 220),
              "In": (215,128,187), "Sn": (154,142,185), "Sb": (215,131,79),
              "Te": (173,162,81), "I": (142,31,138), "Xe": (154,161,248),
              "Cs": (14,254,185), "Ba": (30,239,44), "La": (90,196,73),
              "Ce": (209,252,6), "Pr": (252,225,5), "Nd": (251,141,6),
              "Pm": (0,0,224), "Sm": (252,6,125), "Eu": (250,7,213),
              "Gd": (192,3,255), "Tb": (113,4,254), "Dy": (49,6,252),
              "Ho": (7,65,251), "Er": (73,114,58), "Tm": (0,0,224),
              "Yb": (39,252,244), "Lu": (38,253,181), "Hf": (180,179,89),
              "Ta": (183,154,86), "W": (141,138,127), "Re": (179,176,142),
              "Os": (200,177,120), "Ir": (201,206,114), "Pt": (203,197,191),
              "Au": (254,178,56), "Hg":(211,183,203), "Tl": (149,137,108),
              "Pb": (82,83,91), "Bi": (210,47,247), "Po": (0,0,255),
              "At": (0,0,255), "Rn": (255,255,0), "Fr": (0,0,0),
              "Ra": (109,169,88), "Ac": (100,158,114), "Th": (37,253,120),
              "Pa": (41,250,53), "U": (121,161,170), "Np": (76,76,76),
              "Pu": (76,76,76), "Am": (76,76,76), "Cm": (76,76,76),
              "Bk": (76,76,76), "Cf": (76,76,76), "Es": (76,76,76),
              "Fm": (76,76,76), "Md": (76,76,76), "No": (76,76,76),
              "Lr": (76,76,76), "Rf": (76,76,76), "Db": (76,76,76),
              "Sg": (76,76,76), "Bh": (76,76,76), "Hs": (76,76,76),
              "Mt": (76,76,76)}
              #Rg and Ds were removed becuase they are not in periodictable and will
              #probably never be used.
              #"Ds": (76,76,76), "Rg": (76,76,76)}


#I mean for these dictionaries to be editable.  I can see that if this module is loaded
#after these dictionaries are changed, they could be changed back to their defaults.
#I am rellying on the fact that I do not import anything anywhere expect for at the top
#of files.  Therefore, these defaults should be loaded in at startup and then any changes
#should not be wiped clean.
    
def populateRadDict():
    """This creates returns a dictionary containing all the keys in color_dict
    mapping to their default radii, which are the covalent_radii from periodictable."""
    default = 2; #default radius for elements whos radius is not included in periodictable
    
    radius_dict = {}
    for symbol in color_dict.keys():
        for element in periodictable.elements:
            if element.symbol == symbol:
                if element.covalent_radius == None:
                    radius_dict[symbol] = default
                else:
                    radius_dict[symbol] = element.covalent_radius/5
    return radius_dict

radius_dict = populateRadDict()
 

class Atom():
    #I changed this constructor to not use element object from the periodictable
    #package.  It is a little bit slower this way becuase when one type of atom
    #is recreated many times, the element must be looked up each time, but this
    #way calling code does not need to know about the periodictable package.
    def __init__(self, unit_Cell, position, symbol, massNum = None, valence = "",
                 anisotropy = (0,0,0), spinMagnitude = 1, spin = None,
                 description = "", rgb = None, radius = None):
    #def __init__(self, symbol, massNum = None, unit_Cell = None, position = None, valence = "",
    #             anisotropy = (0,0,0), spinMagnitude = 1, spin = None,
    #             description = "", rgb = None, radius = None):
    #def __init__(self, elementObj, unit_Cell, position, valence = "", anisotropy = (0,0,0),
    #             spinMagnitude = 1, spin = None, description = "", rgb = None, radius= None):
#    def __init__(self, unit_Cell, x,y,z, massNum, description = "", valence = "", 
#                 spin = None, anisotropy = (0,0,0), spinMagnitude = 1, elementObj = None):
        """
	Creates a new atom object which represents an atom site in the lattice.
	
	-symbol is the element symbol (H, He, Li...)
	-massNum is the atomic Mass Number for the element
	If the symbol and mass number do not correspond to a real element, an
	ElementNotFound Exception will be raised.
	
        -position is the fractional coordinates in the unit cell (a,b,c)
        -unit_Cell is the unit cell containing the atom (instance of Cell class)
        -spin is a tuple(Sx, Sy, Sz). It is optional.
        -anisotropy is the single ion anisotropy of the atom (Dx, Dy, Dz)
        -rgb is a 3 element tuple or list describing the color of the atom.  If this is not
        supplied, the default color for that element is used.
        -radius is the radius of the atom in angstroms.  If it is None, it will be given the
        default value for the given element.
        -description is a string describing the atom such as a name/label and is optional.
        """
	#massNum can be None and the default element obj will be used (I think mass is then an average)
        self.elementObj = getElObj(symbol, massNum)#can raise error
	self.massNum = massNum
	
        self.anisotropy = anisotropy
        self.description = description
        if radius == None:
            self.radius = self._getDefaultRadius(self.elementObj.symbol)
        else:
            self.radius = radius
        if rgb == None:
            self.color = self._getDefaultColor(self.elementObj.symbol)
        else:
            self.color = rgb
        self.spin = spin
        self.spinMagnitude = spinMagnitude
        self.valence = valence
	
#	print "valence: ", valence
#	print "Valence type: ", type(valence)

        
	if position[0]<1 and position[1]<1 and position[2]<1: 
            #coordinates  (within cell)
            self.a = position[0]
            self.b = position[1]
            self.c = position[2]
        else:
            raise Exception("a,b,c are fractional coordinates within the unit cell.  They should be less than 1.")
        
        #Unit Cell Containing this Atom
        self.unit_Cell = unit_Cell
	
	#Each atom gets a unique id number within the cell
	self.IDNumber = self.unit_Cell.addAtom(self)
        

    def getAnisotropy(self):
        return self.anisotropy
    
    def getSpin(self):
        return self.spin
    
    def getSpinMagnitude(self):
        return self.spinMagnitude
    
    def setSpin(self, spin):
        self.spin = spin
    
    def getRadius(self):
        return self.radius
    
    def getColor(self):
        """returns (r,g,b) color"""
        return self.color
    
    def getPosition(self):
        """returns (a,b,c) fractional coordinates within Unit Cell + (a,b,c) Unit Cell Position  (integers)"""
        cellPos = self.unit_Cell.getPosition()
        return (self.a + cellPos[0], self.b + cellPos[1], self.c + cellPos[2])
    
    def getRealPosition(self):
        """returns the coordinates x,y,z coordintates of the atom.  For now, this is the fractional
        coordinates (a,b,c) * the lengths of a,b, and c becuase alpha, gamma, beta are all 90
        so a,b,c correspond to x,y,z."""
        x, y, z = self.getPosition()
        cell = self.getUnitCell()
        return (cell.getA()*x, cell.getB()*y, cell.getC()*z)
    
    def getDescription(self):
        return self.description
    
    def getUnitCell(self):
        return self.unit_Cell
    
    def __str__(self):
        return self.getDescription().rstrip() + " at " + str(self.getPosition()) + " in " + self.unit_Cell.__str__() + "  Spin = " + str(self.spinMagnitude)
    
    #def getIndexNumber(self):
    #    """Returns the Atom's Index Number in the Unit Cell
    #    The index is used as a unique identifier when translating the cell (to associate new and old) and when drawing"""
    #    return self.unit_Cell.getAtomIndex(self)
    
    #It is no longer an index number, but a unique identification number(order
    #no longer matters)
    def getIDNum(self):
	return self.IDNumber
    
    def _getDefaultColor(self, element_symbol):
        """Returns default color associated with the given element symbol."""
        #The periodictable class gives Deuterium and tritium their own symbols, which is
        #inconvenient becuase they are not included in periodictable.elements
        if element_symbol == 'D' or element_symbol == 'T':
            element_symbol = 'H'
        try:
          r,g,b = color_dict[element_symbol]
#          print "r,g,b = ", (r,g,b)
          r = r/255.0
          g = g/255.0
          b = b/255.0
          return (r,g,b)
        except KeyError:
          print element_symbol, "is not a valid element symbol."
        except Exception, ex:
            print "exception: ", ex
        return (0,0,0)
    
    def _getDefaultRadius(self, element_symbol):
        """Returns default radius associated with the given element symbol."""
        default = 2#If there is an error, this will be returned.
        if element_symbol == 'D' or element_symbol == 'T':
            element_symbol = 'H'
        try:
          radius= radius_dict[element_symbol]
          return radius
        except KeyError:
          print element_symbol, "is not a valid element symbol."
        except Exception, ex:
            print "exception: ", ex
        return default
    
    def getElementObj(self):
        """Returns the element from the periodictable package which represents this atom."""
        return self.elementObj
    
    def getElementSymbol(self):
        if self.elementObj.symbol == 'D' or self.elementObj.symbol == 'T':
            return 'H'
        return self.elementObj.symbol
    
    def getMassNum(self):
	return self.massNum
    
    def getValence(self):
	return self.valence
    
    def getSymbol(self):
	return self.getElementObj().symbol
    
    
def getElObj(symbol, massNum = None):
    """This function will return the element object corresponding to the given
    element symbol (H, He, Li...) and mass number(for different isotopes).  If
    the given symbol is not a real element symbol or the mass number does not
    correspond to an existing isotope of that element, an ElementNotFound
    exception will be raised.  If massNum is not supplied, the default isotope
    is returned."""
    for element in periodictable.elements:
	    if symbol.lower() == element.symbol.lower() and element.symbol!='n':
		if massNum != None:
		    try:
			return element[massNum]
		    except KeyError:
			raise ElementNotFound(element.name + " does not have an isotope of atomic mass " + str(massNum))
		return element
    else:
	raise ElementNotFound("The element symbol \'" + symbol + "\' is not a real element symbol.")    

class ElementNotFound(Exception):
    """This exception will be used when atom information does not correspond to a
    real element type."""
    def __init__(self, value):
	self.value = value
    def __str__(self):
	return repr(self.value)
		
if __name__ == '__main__':
    #Test
    from periodictable import elements
    for el in elements:
        try:
            print color_dict[el.symbol]
        except:
            print el.symbol, el.name
            
        
        
    
        
