import os, sys, re
import numpy as np
#import calculations.vtkModel.CifFile as CifFile
import CifFile
from calculations.vtkModel.AtomClass import Atom
from calculations.vtkModel.CellClass import Cell
import calculations.vtkModel.SpaceGroups as SpaceGroups
import periodictable



def cif_to_cell(filestr, select_atoms=None):
    """
    This function takes a cif file string as an input, as well as an optional list of atom types to select (ex. Mn).
    """
    #read contents of CIF file
    cf = CifFile.ReadCif(filestr)
    sample_name = cf.dictionary.keys()[0]
    #unit cell in Angstroms
    a =  float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_cell_length_a']))) 
    b =  float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_cell_length_b']))) 
    c =  float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_cell_length_c']))) 
    
    #angles in degrees
    alpha = float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_cell_angle_alpha'])))
    beta  = float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_cell_angle_beta'])))
    gamma = float(re.sub('\)','',re.sub('\(','',cf[sample_name]['_cell_angle_gamma'])))    
    
    #first pick out the space group
    space_group_name = re.sub('\)','',re.sub('\(','',cf[sample_name]['_symmetry_Int_Tables_number']))    
    
    #mycell=Cell(space_group_name)
    lattice={}
    lattice={'a':a,
             'b':b,
             'c':c,
             'alpha':alpha,
             'beta':beta,
             'gamma':gamma
             }
    
    
    
    #make a complete select_atoms list if a null list was provided
    if not select_atoms:
        select_atoms = list(set(cf[sample_name]['_atom_site_type_symbol'])) 
        
    
    atoms = []
    fract_coords = []
    i=0
    x_arr=[]
    y_arr=[]
    z_arr=[]
    for atom_species in cf[sample_name]['_atom_site_type_symbol']:
        x_arr = x_arr+[kill_paren(cf[sample_name]['_atom_site_fract_x'][i])]
        y_arr = y_arr+[kill_paren(cf[sample_name]['_atom_site_fract_y'][i])]
        z_arr = z_arr+[kill_paren(cf[sample_name]['_atom_site_fract_z'][i])]
        i=i+1
        
    occ_arr = cf[sample_name]['_atom_site_occupancy']
    wy_arr = cf[sample_name]['_atom_site_Wyckoff_symbol']
    sym_stuff = cf[sample_name]['_atom_site_symmetry_multiplicity']
    B_arr = cf[sample_name]['_atom_site_B_iso_or_equiv']
    atLab_arr = cf[sample_name]['_atom_site_label']
    
    i=0
    for atom_species in cf[sample_name]['_atom_site_type_symbol']:
        for selected_atom in select_atoms:
            if atom_species.lower()==selected_atom.lower():
                atom={'symbol':grab_element(atom_species)+str(i+1),
                      'x':x_arr[i],
                      'y':y_arr[i],
                      'z':z_arr[i],
                      'b':B_arr[i],
                      'wy':sym_stuff[i]+wy_arr[i].upper(),
                      'occ':occ_arr[i],
                      'label':atLab_arr[i],
                      'element':grab_element(atom_species)
                      }
                atoms.append(atom)
                i=i+1
    
    
    results={}
    results['lattice']=lattice
    results['space_group_name']=space_group_name
    results['atoms']=atoms
    return results

def grab_element(ionstr):
    ion=ionstr[:2]
    if(is_number(ion[1:])):
        print ion[:1]
        return ion[:1]
    print ion
    return ion
def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False
def kill_paren(s):
    if(s.find('(')!=-1):
        return s[:s.find('(')]
    return s
                


if __name__=="__main__":
    filedir=os.path.dirname(__file__)
    #filename="homno3.cif"
    #filestr=os.path.join(filedir, filename)
    #filestr=r'C:\\Users\\ylem\\Documents\\GitHub\\webrefine\\tripleaxis\\webrefine\\homno3.cif'
    filestr=r'homno3.cif'
    cif_to_cell(filestr)
    