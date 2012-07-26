import numpy as np
from AtomClass import Atom
from CellClass import Cell
import SpaceGroups
import periodictable
I=np.complex(0,-1)


def calculateStructFact(request):
        if __name__=="__main__":
            my_group=SpaceGroups.sg62
            mycell=Cell(my_group)
            #Mn=Atom(mycell, (0,0,0),"Mn")
            #idNum=mycell.addAtom(Mn)
            F=0.0
            g=np.array([0,2,0],'Float64')          
            mycell.generateAtoms("Mn",(0,0,0))
            mycell.generateAtoms("Ho",(0.093,0.25,0.984))
            mycell.generateAtoms("O",(.441,0.25,0.136))
            mycell.generateAtoms("O",(0.330,0.068,0.686))
            for key, value in mycell.atoms.items():
                d=value.getPosition()
                sym=value.getElementSymbol()
                b=periodictable.elements.symbol(sym).neutron.b_c#sld(wavelength=1.54)[0]
                F=F+b*np.exp(-1.0j*2*np.pi*np.dot(g,d))
                print sym,b,d,F
                
            print F
            
            print 'done'